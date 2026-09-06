import { z } from "zod";

const dateInput = z.coerce.date();

export const createSessionSchema = z.object({
  studentId: z.string().min(1, "studentId is required."),
  startTime: dateInput,
  endTime: dateInput.optional(),
  duration: z.coerce
    .number()
    .int()
    .positive("Duration must be a positive number of minutes.")
    .optional(),
  notes: z.string().trim().max(2000).optional(),
  status: z.enum(["ONGOING", "COMPLETED", "CANCELLED"]).default("ONGOING"),
});

export const updateSessionSchema = z.object({
  startTime: dateInput.optional(),
  endTime: dateInput.nullable().optional(),
  duration: z.coerce
    .number()
    .int()
    .positive("Duration must be a positive number of minutes.")
    .nullable()
    .optional(),
  notes: z.string().trim().max(2000).nullable().optional(),
  status: z.enum(["ONGOING", "COMPLETED", "CANCELLED"]).optional(),
});
