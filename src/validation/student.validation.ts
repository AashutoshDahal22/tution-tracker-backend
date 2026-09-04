import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .max(200)
  .optional()
  .transform((v) => (v === "" ? undefined : v));

export const createStudentSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  parentName: optionalText,
  phone: optionalText,
  address: optionalText,
  subject: z.string().trim().min(1, "Subject is required.").max(100),
  billingType: z.enum(["HOURLY", "MONTHLY"]).default("HOURLY"),
  rate: z.coerce.number().positive("Rate must be greater than zero."),
});

export const updateStudentSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  parentName: optionalText,
  phone: optionalText,
  address: optionalText,
  subject: z.string().trim().min(1).max(100).optional(),
  billingType: z.enum(["HOURLY", "MONTHLY"]).optional(),
  rate: z.coerce.number().positive("Rate must be greater than zero.").optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});
