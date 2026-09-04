export const sessionSchemas = {
  Session: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },

      studentId: {
        type: "string",
      },

      startTime: {
        type: "string",
        format: "date-time",
      },

      endTime: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      duration: {
        type: "integer",
        nullable: true,
      },

      amount: {
        type: "number",
        nullable: true,
        description:
          "Fee snapshot: HOURLY rate * duration/60, 0 for cancelled, null for monthly/unpriced.",
      },

      notes: {
        type: "string",
        nullable: true,
      },

      status: {
        type: "string",
        enum: [
          "ONGOING",
          "COMPLETED",
          "CANCELLED",
        ],
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CreateSessionRequest: {
    type: "object",
    required: [
      "studentId",
      "startTime",
    ],
    properties: {
      studentId: {
        type: "string",
      },

      startTime: {
        type: "string",
        format: "date-time",
      },

      notes: {
        type: "string",
      },
    },
  },

  UpdateSessionRequest: {
    type: "object",
    properties: {
      startTime: {
        type: "string",
        format: "date-time",
      },

      endTime: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      duration: {
        type: "integer",
        nullable: true,
      },

      notes: {
        type: "string",
        nullable: true,
      },

      status: {
        type: "string",
        enum: ["ONGOING", "COMPLETED", "CANCELLED"],
      },
    },
  },

  CompleteSessionRequest: {
    type: "object",
    required: [
      "endTime",
    ],
    properties: {
      endTime: {
        type: "string",
        format: "date-time",
      },

      notes: {
        type: "string",
      },
    },
  },
};