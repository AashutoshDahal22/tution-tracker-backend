import prisma from "@/lib/prisma.js";
import AppError from "@/utils/AppError.js";
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

  const session = await prisma.session.create({
    data: toSessionCreateData(userId, data),
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
  await getById(userId, sessionId);

  const session = await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: toSessionUpdateData(data),
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
