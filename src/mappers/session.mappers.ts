import type { Prisma, Session, SessionStatus } from "@prisma/client";
import type {
  CreateSessionDto,
  UpdateSessionDto,
} from "@/types/session.types.js";

export const toSessionCreateData = (
  userId: string,
  dto: CreateSessionDto,
): Prisma.SessionCreateInput => ({
  startTime: dto.startTime,
  endTime: dto.endTime,
  duration: dto.duration,
  notes: dto.notes,
  status: dto.status,

  student: {
    connect: {
      id: dto.studentId,
    },
  },

  user: {
    connect: {
      id: userId,
    },
  },
});

export const toSessionUpdateData = (
  dto: UpdateSessionDto,
): Prisma.SessionUpdateInput => {
  const data: Prisma.SessionUpdateInput = {};

  if (dto.startTime !== undefined) data.startTime = dto.startTime;
  if (dto.endTime !== undefined) data.endTime = dto.endTime;
  if (dto.duration !== undefined) data.duration = dto.duration;
  if (dto.notes !== undefined) data.notes = dto.notes;
  if (dto.status !== undefined) data.status = dto.status;

  return data;
};

export const toSessionStudentWhere = (
  userId: string,
  studentId: string,
): Prisma.StudentWhereInput => ({
  id: studentId,
  userId,
});

export const toSessionListWhere = (
  userId: string,
): Prisma.SessionWhereInput => ({
  student: {
    userId,
  },
});

export const toSessionListOrderBy: Prisma.SessionOrderByWithRelationInput = {
  startTime: "desc",
};

export const toSessionByIdWhere = (
  userId: string,
  sessionId: string,
): Prisma.SessionWhereInput => ({
  id: sessionId,
  student: {
    userId,
  },
});

export const sanitizeSession = (session: Session) => ({
  id: session.id,
  studentId: session.studentId,
  startTime: session.startTime,
  endTime: session.endTime,
  duration: session.duration,
  notes: session.notes,
  status: session.status,
  createdAt: session.createdAt,
  updatedAt: session.updatedAt,
});
