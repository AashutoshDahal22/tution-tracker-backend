import express from "express";
import cors from "cors";
import authRouter from "@/routes/auth.route.js";
import studentRouter from "@/routes/student.route.js";
import sessionRouter from "@/routes/session.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// health check for this api to see if the server is working or not
app.get("/health", (_, res) => {
  res.json({
    message: "API is working",
  });
});

app.use("/auth", authRouter);
app.use("/students", studentRouter);
app.use("/session", sessionRouter);

export default app;
