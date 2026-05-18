// One-off: migrate src/data/about.ts → volunteers table.
//
//   npm run seed:volunteers
//
// Inserts rows with sort_order = index * 10 so admins can later squeeze
// entries in between without renumbering. image_path is left null for every
// row — the existing /public/about/volunteers/*.jpg files stay around as
// the "default" visuals (rendered via the /logo.webp fallback path is not
// quite right, see plan note); admins re-upload via the new UI to switch a
// row over to a Supabase-Storage-backed image.
//
// Idempotent: matches on (first_name, last_initial, branch). Re-running
// updates existing rows in place rather than duplicating.

import { config as loadEnv } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { volunteers } from "../src/data/about";

loadEnv({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false }
});

async function main() {
  console.log(`Seeding ${volunteers.length} volunteers...`);
  let inserted = 0;
  let updated = 0;
  for (let i = 0; i < volunteers.length; i += 1) {
    const v = volunteers[i];
    const sortOrder = i * 10;
    const { data: existing, error: lookupErr } = await supabase
      .from("volunteers")
      .select("id")
      .eq("first_name", v.firstName)
      .eq("last_initial", v.lastInitial)
      .eq("branch", v.branch)
      .maybeSingle();
    if (lookupErr) {
      console.error("Lookup failed:", lookupErr);
      process.exit(1);
    }
    if (existing) {
      const { error: updErr } = await supabase
        .from("volunteers")
        .update({ sort_order: sortOrder })
        .eq("id", existing.id);
      if (updErr) {
        console.error("Update failed:", updErr);
        process.exit(1);
      }
      updated += 1;
    } else {
      const { error: insErr } = await supabase.from("volunteers").insert({
        first_name: v.firstName,
        last_initial: v.lastInitial,
        branch: v.branch,
        image_path: null,
        sort_order: sortOrder
      });
      if (insErr) {
        console.error("Insert failed:", insErr);
        process.exit(1);
      }
      inserted += 1;
    }
  }
  console.log(`Done. ${inserted} inserted, ${updated} updated.`);
}

main();
