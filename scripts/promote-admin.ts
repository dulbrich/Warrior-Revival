// One-off bootstrap: promote a user to the 'admin' role.
//
//   npm run promote:admin -- david@ulbrichpro.com
//
// Uses the service-role key from .env.local to call Supabase's admin API.
// After running, the target user must sign out and sign back in so their
// new JWT includes the role claim.

import { config as loadEnv } from "dotenv";
import { createClient } from "@supabase/supabase-js";

loadEnv({ path: ".env.local" });

const email = process.argv[2];
if (!email) {
  console.error("Usage: npm run promote:admin -- <email>");
  process.exit(1);
}

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
  // listUsers is paged; 200 per page comfortably covers our scale.
  const { data, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (error) {
    console.error("List users failed:", error);
    process.exit(1);
  }
  const user = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!user) {
    console.error(`No user found with email ${email}. Have they signed in at least once?`);
    process.exit(1);
  }

  const merged = { ...(user.app_metadata ?? {}), role: "admin" };
  const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
    app_metadata: merged
  });
  if (updateError) {
    console.error("Update failed:", updateError);
    process.exit(1);
  }
  console.log(
    `Promoted ${email} (id ${user.id}) to admin. Sign out + back in to refresh the JWT.`
  );
}

main();
