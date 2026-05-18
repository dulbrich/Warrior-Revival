import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

// Free-tier hard cap is 1 GB across ALL buckets in the project.
const FREE_TIER_LIMIT_BYTES = 1024 * 1024 * 1024;

type BucketUsage = {
  name: string;
  bytes: number;
};

export type ProjectStorageUsage = {
  usedBytes: number;
  limitBytes: number;
  percentage: number;          // 0..100, two decimals
  bucketBreakdown: BucketUsage[];
};

// Walks every bucket and recursively sums object sizes. Service-role only
// because listBuckets is admin-API. Called from the admin gallery page;
// not exposed to the client. ~50–200 ms for a few hundred files; if it
// ever gets slow, wrap in unstable_cache with a short TTL.
export async function getProjectStorageUsage(): Promise<ProjectStorageUsage> {
  const supabase = createSupabaseAdminClient();
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) throw new Error(`Failed to list buckets: ${error.message}`);

  const breakdown: BucketUsage[] = [];
  let total = 0;
  for (const bucket of buckets ?? []) {
    const bytes = await sumBucket(supabase, bucket.name, "");
    breakdown.push({ name: bucket.name, bytes });
    total += bytes;
  }
  breakdown.sort((a, b) => b.bytes - a.bytes);

  const percentage =
    Math.round((total / FREE_TIER_LIMIT_BYTES) * 10000) / 100;

  return {
    usedBytes: total,
    limitBytes: FREE_TIER_LIMIT_BYTES,
    percentage,
    bucketBreakdown: breakdown
  };
}

// Storage.list returns both files (id !== null) and folder pseudo-entries
// (id === null, no metadata). For folders we recurse; for files we sum
// metadata.size. Pagination uses offset since the SDK supports it.
async function sumBucket(
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  bucketName: string,
  prefix: string
): Promise<number> {
  let bytes = 0;
  let offset = 0;
  const limit = 1000;
  // Cap recursion in pathological cases.
  let safety = 50;
  while (safety-- > 0) {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list(prefix, { limit, offset });
    if (error) {
      console.error(`[storage-usage] list ${bucketName}/${prefix} failed:`, error.message);
      return bytes;
    }
    if (!data || data.length === 0) break;
    for (const entry of data) {
      if (entry.id === null) {
        const childPrefix = prefix ? `${prefix}/${entry.name}` : entry.name;
        bytes += await sumBucket(supabase, bucketName, childPrefix);
      } else {
        const size = (entry.metadata as { size?: number } | null)?.size ?? 0;
        bytes += size;
      }
    }
    if (data.length < limit) break;
    offset += limit;
  }
  return bytes;
}

// Helper for the UI: 1234567 → "1.18 MB".
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
