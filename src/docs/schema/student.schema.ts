export const studentSchemas = {
  Student: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },

      studentCode: {
        type: "string",
        example: "STU-001",
      },

      name: {
        type: "string",
      },

      parentName: {
        type: "string",
        nullable: true,
      },

      phone: {
        type: "string",
        nullable: true,
      },

      address: {
        type: "string",
        nullable: true,
      },

      subject: {
        type: "string",
        example: "Mathematics",
      },

      billingType: {
        type: "string",
        enum: ["HOURLY", "MONTHLY"],
      },

      rate: {
        type: "number",
        example: 1500,
      },

      status: {
        type: "string",
        enum: ["ACTIVE", "INACTIVE"],
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

  CreateStudentRequest: {
    type: "object",
    required: [
      "studentCode",
      "name",
      "subject",
      "billingType"
    ],
    properties: {
      studentCode: {
        type: "string",
      },

      name: {
        type: "string",
      },

      parentName: {
        type: "string",
      },

      phone: {
        type: "string",
      },

      address: {
        type: "string",
      },

      subject: {
        type: "string",
      },

      billingType: {
        type: "string",
        enum: ["HOURLY", "MONTHLY"],
      },

      rate: {
        type: "number",
      },
    },
  },

  UpdateStudentRequest: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },

      parentName: {
        type: "string",
      },

      phone: {
        type: "string",
      },

      address: {
        type: "string",
      },

      subject: {
        type: "string",
      },

      billingType: {
        type: "string",
        enum: ["HOURLY", "MONTHLY"],
      },

      rate: {
        type: "number",
      },

      status: {
        type: "string",
        enum: ["ACTIVE", "INACTIVE"],
      },
    },
  },
};