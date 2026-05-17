import { z } from "zod";
import { IMAGE_KEYS } from "./imageKeys";

export const EVENT_STATUSES = ["pending", "approved", "removed"] as const;
export const eventStatusSchema = z.enum(EVENT_STATUSES);

// Strip empty-string FormData values so optional Zod fields don't have to
// special-case them. Returns a plain object suitable for safeParse.
export function formDataToObject(fd: FormData): Record<string, string | undefined> {
  const out: Record<string, string | undefined> = {};
  for (const [k, v] of fd.entries()) {
    if (typeof v !== "string") continue;
    const trimmed = v.trim();
    out[k] = trimmed === "" ? undefined : trimmed;
  }
  return out;
}

// Input shape from the admin EventForm. Optional string fields become null in
// the DB so empty-string vs null can't collide downstream.
const optionalString = z.string().trim().min(1).optional();
const optionalTime = z
  .string()
  .regex(/^\d{2}:\d{2}(:\d{2})?$/, "Time must be HH:MM or HH:MM:SS")
  .optional();

export const eventFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  status: eventStatusSchema.default("pending"),
  description: optionalString,
  event_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  start_time: optionalTime,
  end_time: optionalTime,
  timezone: z.string().default("America/Denver"),
  location: z.string().trim().min(1, "Location is required"),
  address: optionalString,
  city: optionalString,
  state: optionalString,
  zip: optionalString,
  audience: optionalString,
  image_key: z.enum(IMAGE_KEYS).optional(),
  register_link: optionalString,
  cost: optionalString,
  host_name: optionalString,
  contact_name: optionalString,
  contact_phone: optionalString
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
