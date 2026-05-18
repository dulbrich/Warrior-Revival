import { z } from "zod";

// Just the quote — sort order is managed via the reorder action, not the form.
export const testimonialFormSchema = z.object({
  quote: z
    .string()
    .trim()
    .min(1, "Quote is required")
    .max(2000, "Quote is too long")
});

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;
