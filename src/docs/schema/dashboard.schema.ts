export const dashboardSchemas = {
  DashboardStats: {
    type: "object",
    properties: {
      totals: {
        type: "object",
        properties: {
          students: { type: "integer" },
          activeStudents: { type: "integer" },
          sessions: { type: "integer" },
          completedSessions: { type: "integer" },
          earned: { type: "number" },
        },
      },
      month: {
        type: "object",
        properties: {
          label: { type: "string" },
          range: { type: "string" },
          sessions: { type: "integer" },
          held: { type: "integer" },
          upcoming: { type: "integer" },
          earned: { type: "number" },
        },
      },
      topStudents: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            subject: { type: "string" },
            sessions: { type: "integer" },
            earned: { type: "number" },
          },
        },
      },
      recent: {
        type: "array",
        items: { $ref: "#/components/schemas/Session" },
      },
    },
  },
};
