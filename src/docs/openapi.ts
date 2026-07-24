import swaggerJSDoc from "swagger-jsdoc";
import { authSchemas } from "./schema/auth.schema.js";
import { studentSchemas } from "./schema/student.schema.js";
import { sessionSchemas } from "./schema/session.schema.js";
import { commonSchemas } from "./schema/common.schema.js";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Tuition Tracker API",
      version: "1.0.0",
      description: "REST API documentation for Tuition Tracker",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        ...commonSchemas,
        ...authSchemas,
        ...sessionSchemas,
        ...studentSchemas,
      },
    },
  },

  apis: ["./src/routes/**/*.ts"],
};

export const openApiSpec = swaggerJSDoc(options);
