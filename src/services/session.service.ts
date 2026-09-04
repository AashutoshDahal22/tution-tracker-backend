import prisma from "@/lib/prisma.js";
import AppError from "@/utils/AppError.js";
import {
  computeSessionAmount,
  resolveDurationMinutes,
} from "@/utils/earnings.js";
import {
  toSessionCreateData,
  toSessionUpdateData,
} from "@/mappers/session.mappers.js";
import type {
  CreateSessionDto,
  UpdateSessionDto,
} from "@/types/session.types.js";

const create = async (userId: string, data: CreateSessionDto) => {
  const student = await prisma.student.findFirst({
    where: {
      id: data.studentId,
      userId,
    },
  });

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  const status = data.status ?? "ONGOING";
  const duration = resolveDurationMinutes({
    duration: data.duration,
    startTime: data.startTime,
    endTime: data.endTime,
  });
  const amount = computeSessionAmount(student, duration, status);

  const session = await prisma.session.create({
    data: toSessionCreateData(userId, data, { duration, amount }),
    include: {
      student: true,
    },
  });

  return session;
};

const getAll = async (userId: string) => {
  const sessions = await prisma.session.findMany({
    where: {
      student: {
        userId,
      },
    },
    include: {
      student: true,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return sessions;
};

const getById = async (userId: string, sessionId: string) => {
  const session = await prisma.session.findFirst({
    where: {
      id: sessionId,
      student: {
        userId,
      },
    },
    include: {
      student: true,
    },
  });

  if (!session) {
    throw new AppError("Session not found.", 404);
  }

  return session;
};

const update = async (
  userId: string,
  sessionId: string,
  data: UpdateSessionDto,
) => {
  const existing = await getById(userId, sessionId);

  const startTime =
    data.startTime !== undefined ? data.startTime : existing.startTime;
  const endTime =
    data.endTime !== undefined ? data.endTime : existing.endTime;
  const status = data.status ?? existing.status;

  // Recompute duration/amount only when a relevant input changed.
  const touchesPricing =
    data.startTime !== undefined ||
    data.endTime !== undefined ||
    data.duration !== undefined ||
    data.status !== undefined;

  let duration: number | null | undefined;
  let amount: number | null | undefined;

  if (touchesPricing) {
    const rawDuration =
      data.duration !== undefined ? data.duration : existing.duration;
    duration = resolveDurationMinutes({
      duration: rawDuration,
      startTime,
      endTime,
    });
    amount = computeSessionAmount(existing.student, duration, status);
  }

  const session = await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: toSessionUpdateData(data, { duration, amount }),
    include: {
      student: true,
    },
  });

  return session;
};

const remove = async (userId: string, sessionId: string) => {
  await getById(userId, sessionId);

  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
};

const sessionService = {
  create,
  getAll,
  getById,
  update,
  remove,
};

export default sessionService;
