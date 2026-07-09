import prisma from "@/lib/prisma.js";

export const generateStudentCode = async () => {
  const count = await prisma.student.count();

  return `STU-${String(count + 1).padStart(4, "0")}`;
};
