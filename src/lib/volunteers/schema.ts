import { z } from "zod";

// Text fields only — image is a File and goes through FormData separately
// (it'd be type-erased by formDataToObject in src/lib/events/schema.ts).
export const volunteerFormSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_initial: z
    .string()
    .trim()
    .max(2, "Use 1 letter for the initial")
    .optional()
    .transform((v) => v ?? ""),
  branch: z.string().trim().min(1, "Branch is required")
});

export type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;
