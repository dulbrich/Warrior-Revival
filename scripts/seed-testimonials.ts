// One-off: migrate the hard-coded testimonialCards array from
// src/app/veterans/VeteransPageClient.tsx into the testimonials table.
//
//   npm run seed:testimonials
//
// Idempotent on the quote text: re-running updates sort_order rather than
// duplicating. sort_order is set to array index * 10 so admins can squeeze
// new entries in between later without renumbering.

import { config as loadEnv } from "dotenv";
import { createClient } from "@supabase/supabase-js";

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

const SEED_QUOTES: string[] = [
  "Thanks for the opportunity to dive. I feel much safer and confident to look into getting certified now.",
  "Warrior Revival got me out my comfort zone. It showed me what’s still possible. I had a blast and can’t wait to do it again.",
  "The Warrior Revival group was so helpful. I'm so happy my daughter was there with me. She felt so welcomed and loved by everyone.",
  "It's always nice to be among like minded people that can understand the military culture specially since SLC is not a big military concentration town and be able to exchange ideas and other things regarding veteran health and well being and support.",
  "I’m so thankful for the incredible opportunity to skydive last month with Warrior Revival. It was an unforgettable experience I probably wouldn’t have pursued on my own.",
  "I was able to attend the 1st Annual Fishing tournament put on by my Warrior Revival on 20 September. As a retired Air Force Veteran, I felt this event was very well represented, organized, and a great opportunity to get outdoors and enjoy the beauty of Utah and Strawberry Reservoir. Additionally, and more importantly, it was a great way to meet other Veterans, family members, and people that support our Veterans here in Utah. I will definitely be attending next year, and am looking forward to another amazing turnout.",
  "This was my boy's first time experiencing a Jazz game and they loved it. Thank you so much for the opportunity!",
  "It’s easy to see why Warrior Revival has impacted so many lives so powerfully. Katie, Carl, and the whole team genuinely care about each person they interact with. It’s a joy and an honor to be part of anything Warrior Revival does!"
];

async function main() {
  console.log(`Seeding ${SEED_QUOTES.length} testimonials...`);
  let inserted = 0;
  let updated = 0;
  for (let i = 0; i < SEED_QUOTES.length; i += 1) {
    const quote = SEED_QUOTES[i];
    const sortOrder = i * 10;
    const { data: existing, error: lookupErr } = await supabase
      .from("testimonials")
      .select("id")
      .eq("quote", quote)
      .maybeSingle();
    if (lookupErr) {
      console.error("Lookup failed:", lookupErr);
      process.exit(1);
    }
    if (existing) {
      const { error: updErr } = await supabase
        .from("testimonials")
        .update({ sort_order: sortOrder })
        .eq("id", existing.id);
      if (updErr) {
        console.error("Update failed:", updErr);
        process.exit(1);
      }
      updated += 1;
    } else {
      const { error: insErr } = await supabase
        .from("testimonials")
        .insert({ quote, sort_order: sortOrder });
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
