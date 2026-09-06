import { randomBytes } from "node:crypto";
import prisma from "@/lib/prisma.js";

// Collision-safe: random suffix + uniqueness check with retries.
// Avoids the old count-based approach (global counter, races, reuse after delete).
export const generateStudentCode = async (): Promise<string> => {
  for (let attempt = 0; attempt < 10; attempt++) {
    const suffix = randomBytes(3).toString("hex").toUpperCase();
    const code = `STU-${suffix}`;
    const existing = await prisma.student.findUnique({
      where: { studentCode: code },
      select: { id: true },
    });
    if (!existing) return code;
  }

  // Extremely unlikely fallback: timestamp-based.
  return `STU-${Date.now().toString(36).toUpperCase()}`;
};
