import prisma from "@/lib/prisma.js";
import {
  computeSessionAmount,
  resolveDurationMinutes,
} from "@/utils/earnings.js";

const effectiveAmount = (s: {
  status: "ONGOING" | "COMPLETED" | "CANCELLED";
  amount: number | null;
  duration: number | null;
  startTime: Date;
  endTime: Date | null;
  student: { billingType: "HOURLY" | "MONTHLY"; rate: number | null };
}): number => {
  if (s.amount !== null) return s.amount;
  // Fallback for rows created before the amount column existed.
  const duration = resolveDurationMinutes({
    duration: s.duration,
    startTime: s.startTime,
    endTime: s.endTime,
  });
  return computeSessionAmount(s.student, duration, s.status) ?? 0;
};

const getStats = async (userId: string) => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [students, sessions] = await Promise.all([
    prisma.student.findMany({
      where: { userId },
      select: { id: true, name: true, subject: true, status: true },
    }),
    prisma.session.findMany({
      where: { student: { userId } },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            subject: true,
            billingType: true,
            rate: true,
          },
        },
      },
      orderBy: { startTime: "desc" },
    }),
  ]);

  const completed = sessions.filter((s) => s.status === "COMPLETED");
  const earned = completed.reduce((sum, s) => sum + effectiveAmount(s), 0);

  const monthSessions = sessions.filter(
    (s) => s.startTime >= monthStart && s.startTime < monthEnd,
  );
  const monthHeld = monthSessions.filter((s) => s.status === "COMPLETED");
  const monthEarned = monthHeld.reduce(
    (sum, s) => sum + effectiveAmount(s),
    0,
  );

  const byStudent = new Map<
    string,
    { id: string; name: string; subject: string; sessions: number; earned: number }
  >();
  for (const s of sessions) {
    const entry = byStudent.get(s.studentId) ?? {
      id: s.studentId,
      name: s.student.name,
      subject: s.student.subject,
      sessions: 0,
      earned: 0,
    };
    entry.sessions += 1;
    if (s.status === "COMPLETED") entry.earned += effectiveAmount(s);
    byStudent.set(s.studentId, entry);
  }
  const topStudents = [...byStudent.values()]
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 5);

  return {
    totals: {
      students: students.length,
      activeStudents: students.filter((s) => s.status === "ACTIVE").length,
      sessions: sessions.length,
      completedSessions: completed.length,
      earned: Math.round(earned * 100) / 100,
    },
    month: {
      label: now.toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      }),
      range: `${monthStart.toLocaleDateString(undefined, { month: "short", day: "numeric" })} – ${new Date(monthEnd.getTime() - 1).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`,
      sessions: monthSessions.length,
      held: monthHeld.length,
      upcoming: monthSessions.filter((s) => s.status === "ONGOING").length,
      earned: Math.round(monthEarned * 100) / 100,
    },
    topStudents,
    recent: sessions.slice(0, 8),
  };
};

const dashboardService = { getStats };

export default dashboardService;
