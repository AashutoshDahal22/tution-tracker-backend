import { Router } from "express";
import sessionController from "../controllers/session.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", sessionController.create);
router.get("/", sessionController.getAll);
router.get("/:id", sessionController.getById);
router.patch("/:id", sessionController.update);
router.delete("/:id", sessionController.remove);

export default router;
