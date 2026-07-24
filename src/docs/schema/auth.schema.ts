export const authSchemas = {
  RegisterRequest: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
        example: "Aashutosh Dahal",
      },
      email: {
        type: "string",
        format: "email",
        example: "aashu@gmail.com",
      },
      password: {
        type: "string",
        format: "password",
        minLength: 8,
        example: "Password123!",
      },
    },
  },

  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "aashu@gmail.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "Password123!",
      },
    },
  },

  User: {
    type: "object",
    properties: {
      id: {
        type: "string",
        example: "cmdd1abc123xyz",
      },
      name: {
        type: "string",
        example: "Aashutosh Dahal",
      },
      email: {
        type: "string",
        format: "email",
        example: "aashu@gmail.com",
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

  RegisterResponse: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        example: true,
      },
      message: {
        type: "string",
        example: "User registered successfully.",
      },
      data: {
        $ref: "#/components/schemas/User",
      },
    },
  },

  LoginResponse: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        example: true,
      },
      message: {
        type: "string",
        example: "Login successful.",
      },
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI...",
      },
    },
  },
};