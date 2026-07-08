import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import studentController from "../controllers/student.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", studentController.create);
router.get("/", studentController.getAll);
router.get("/:id", studentController.getById);
router.patch("/:id", studentController.update);
router.delete("/:id", studentController.remove);

export default router;
