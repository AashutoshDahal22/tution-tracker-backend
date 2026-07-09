import type { BillingType, StudentStatus } from "@prisma/client";

export interface CreateStudentDto {
  name: string;
  parentName?: string;
  phone?: string;
  address?: string;
  subject: string;
  billingType: BillingType;
  rate: number;
}

export interface UpdateStudentDto {
  name?: string;
  parentName?: string;
  phone?: string;
  address?: string;
  subject?: string;
  billingType?: BillingType;
  rate?: number;
  status?: StudentStatus;
}
