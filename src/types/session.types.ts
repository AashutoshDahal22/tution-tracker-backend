import type { SessionStatus } from "@prisma/client";

export interface CreateSessionDto {
  studentId: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  notes: string;
  status: SessionStatus;
}

export interface UpdateSessionDto {
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  notes?: string;
  status?: SessionStatus;
}
