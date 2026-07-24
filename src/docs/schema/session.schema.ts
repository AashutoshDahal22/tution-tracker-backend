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