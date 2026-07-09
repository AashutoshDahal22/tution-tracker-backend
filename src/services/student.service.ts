import AppError from "@/utils/AppError.js";
import prisma from "@/lib/prisma.js";
import { generateStudentCode } from "@/utils/studentCodegenerator.js";
import type {
  CreateStudentDto,
  UpdateStudentDto,
} from "@/types/students.types.js";
import {
  toStudentByIdWhere,
  toStudentCreateData,
  toStudentDeleteWhere,
  toStudentDuplicateWhere,
  toStudentListOrderBy,
  toStudentListWhere,
  toStudentUpdateData,
} from "@/mappers/student.mapper.js";

const create = async (userId: string, data: CreateStudentDto) => {
  if (data.rate <= 0) {
    throw new AppError("Rate must be greater than zero.", 400);
  }

  const existing = await prisma.student.findFirst({
    where: toStudentDuplicateWhere(userId, data),
  });

  if (existing) {
    throw new AppError("A student with similar details already exists.", 409);
  }

  const studentCode = await generateStudentCode();

  return prisma.student.create({
    data: toStudentCreateData(userId, studentCode, data),
  });
};

const update = async (
  userId: string,
  studentId: string,
  dto: UpdateStudentDto,
) => {
  await getById(userId, studentId);

  if (dto.rate !== undefined && dto.rate <= 0) {
    throw new AppError("Rate must be greater than zero.", 400);
  }

  return prisma.student.update({
    where: toStudentDeleteWhere(studentId),
    data: toStudentUpdateData(dto),
  });
};

const getAll = async (userId: string) => {
  return prisma.student.findMany({
    where: toStudentListWhere(userId),
    orderBy: toStudentListOrderBy,
  });
};

const getById = async (userId: string, studentId: string) => {
  const student = await prisma.student.findFirst({
    where: toStudentByIdWhere(userId, studentId),
  });
  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  return student;
};

const remove = async (userId: string, studentId: string) => {
  await getById(userId, studentId);

  await prisma.student.delete({
    where: toStudentDeleteWhere(studentId),
  });
};

const studentService = {
  create,
  getAll,
  getById,
  update,
  remove,
};

export default studentService;
