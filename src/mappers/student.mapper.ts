import type { Prisma, Student } from "@prisma/client";
import type {
  CreateStudentDto,
  UpdateStudentDto,
} from "@/types/students.types.js";

export const toStudentCreateData = (
  userId: string,
  studentCode: string,
  dto: CreateStudentDto,
): Prisma.StudentCreateInput => {
  const data: Prisma.StudentCreateInput = {
    studentCode,
    name: dto.name,
    subject: dto.subject,
    billingType: dto.billingType,
    rate: dto.rate,

    user: {
      connect: {
        id: userId,
      },
    },
  };

  if (dto.parentName !== undefined) data.parentName = dto.parentName;
  if (dto.phone !== undefined) data.phone = dto.phone;
  if (dto.address !== undefined) data.address = dto.address;

  return data;
};

export const toStudentUpdateData = (
  dto: UpdateStudentDto,
): Prisma.StudentUpdateInput => {
  const data: Prisma.StudentUpdateInput = {};

  if (dto.name !== undefined) data.name = dto.name;
  if (dto.parentName !== undefined) data.parentName = dto.parentName;
  if (dto.phone !== undefined) data.phone = dto.phone;
  if (dto.address !== undefined) data.address = dto.address;
  if (dto.subject !== undefined) data.subject = dto.subject;
  if (dto.billingType !== undefined) data.billingType = dto.billingType;
  if (dto.rate !== undefined) data.rate = dto.rate;
  if (dto.status !== undefined) data.status = dto.status;

  return data;
};

export const toStudentDuplicateWhere = (
  userId: string,
  dto: CreateStudentDto,
): Prisma.StudentWhereInput => {
  const where: Prisma.StudentWhereInput = {
    userId,
    name: {
      equals: dto.name,
      mode: "insensitive",
    },
  };

  if (dto.parentName !== undefined) {
    where.parentName = dto.parentName;
  }

  if (dto.phone !== undefined) {
    where.phone = dto.phone;
  }

  return where;
};

export const toStudentListWhere = (
  userId: string,
): Prisma.StudentWhereInput => ({
  userId,
});

export const toStudentListOrderBy: Prisma.StudentOrderByWithRelationInput = {
  createdAt: "desc",
};

export const toStudentByIdWhere = (
  userId: string,
  studentId: string,
): Prisma.StudentWhereInput => ({
  id: studentId,
  userId,
});

export const toStudentDeleteWhere = (
  studentId: string,
): Prisma.StudentWhereUniqueInput => ({
  id: studentId,
});

export const sanitizeStudent = (student: Student) => ({
  id: student.id,
  studentCode: student.studentCode,
  name: student.name,
  parentName: student.parentName,
  phone: student.phone,
  address: student.address,
  subject: student.subject,
  billingType: student.billingType,
  rate: student.rate,
  status: student.status,
  createdAt: student.createdAt,
  updatedAt: student.updatedAt,
});
