import { BillingType } from "@prisma/client";
import AppError from "../utils/AppError.js";
import prisma from "../lib/prisma.js";

interface CreateStudentInput {
  name: string;
  parentName: string;
  phone: string;
  address: string;
  subject: string;
  billingType: BillingType;
  hourlyRate: number;
}

interface UpdateStudentInput {
  name?: string;
  parentName?: string | null;
  phone?: string;
  address?: string;
  subject?: string;
  billingType?: BillingType;
  hourlyRate?: number | null;
  isActive?: boolean;
}

const create = async (userId: string, data: CreateStudentInput) => {
  if (data.billingType === BillingType.HOURLY && data.hourlyRate == null) {
    throw new AppError("Hourly rate is required for hourly billing.", 400);
  }

  const student = await prisma.student.create({
    data: {
      name: data.name,
      parentName: data.parentName,
      phone: data.phone,
      address: data.address,
      subject: data.subject,
      billingType: data.billingType,
      hourlyRate:
        data.billingType === BillingType.HOURLY ? data.hourlyRate : null,
      userId,
    },
  });

  return student;
};

const getAll = async (userId: string) => {
  const students = await prisma.student.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return students;
};

const getById = async (userId: string, studentId: string) => {
  const student = await prisma.student.findFirst({
    where: {
      id: studentId,
      userId,
    },
  });

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  return student;
};

const update = async (
  userId: string,
  studentId: string,
  data: UpdateStudentInput,
) => {
  await getById(userId, studentId);

  if (data.billingType === BillingType.HOURLY && data.hourlyRate == null) {
    throw new AppError("Hourly rate is required for hourly billing.", 400);
  }

  const student = await prisma.student.update({
    where: {
      id: studentId,
    },
    data,
  });

  return student;
};

const remove = async (userId: string, studentId: string) => {
  await getById(userId, studentId);

  await prisma.student.delete({
    where: {
      id: studentId,
    },
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
