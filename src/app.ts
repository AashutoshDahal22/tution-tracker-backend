import express from "express";
import cors from "cors";
import authRouter from "@/routes/auth.route.js";
import studentRouter from "@/routes/student.route.js";
import sessionRouter from "@/routes/session.route.js";
import dashboardRouter from "@/routes/dashboard.route.js";
import {
  apiRateLimiter,
  authRateLimiter,
} from "@/middleware/rate-limit.middleware.js";
import { errorHandler } from "@/middleware/error.middleware.js";
import { apiReference } from "@scalar/express-api-reference";
import { openApiSpec } from "./docs/openapi.js";

const app = express();

app.use(cors());
app.use(express.json());

// health check for this api to see if the server is working or not
app.get("/health", (_, res) => {
  res.json({
    message: "API is working",
  });
});

app.use("/reference", apiReference({ content: openApiSpec }));
app.use("/auth", authRateLimiter, authRouter);
app.use("/students", apiRateLimiter, studentRouter);
// Canonical plural path + legacy singular alias (frontend historically used /session).
app.use("/sessions", apiRateLimiter, sessionRouter);
app.use("/session", apiRateLimiter, sessionRouter);
app.use("/dashboard", apiRateLimiter, dashboardRouter);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

app.use(errorHandler);

export default app;
