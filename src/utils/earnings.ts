import type { BillingType, SessionStatus } from "@prisma/client";

interface StudentBilling {
  billingType: BillingType;
  rate: number | null;
}

export const resolveDurationMinutes = (input: {
  duration?: number | null | undefined;
  startTime?: Date | string | undefined;
  endTime?: Date | string | null | undefined;
}): number | null => {
  if (typeof input.duration === "number" && Number.isFinite(input.duration)) {
    return Math.round(input.duration);
  }
  if (input.startTime && input.endTime) {
    const ms =
      new Date(input.endTime).getTime() - new Date(input.startTime).getTime();
    if (Number.isFinite(ms) && ms > 0) return Math.round(ms / 60000);
  }
  return null;
};

/**
 * Fee snapshot for a session.
 * - CANCELLED -> 0
 * - HOURLY with rate + duration -> rate * minutes/60 (rounded to 2dp)
 * - Otherwise (MONTHLY, missing rate/duration) -> null
 */
export const computeSessionAmount = (
  student: StudentBilling,
  durationMinutes: number | null,
  status: SessionStatus,
): number | null => {
  if (status === "CANCELLED") return 0;
  if (student.billingType !== "HOURLY") return null;
  if (student.rate === null || durationMinutes === null) return null;
  return Math.round((student.rate * durationMinutes) / 60 * 100) / 100;
};
