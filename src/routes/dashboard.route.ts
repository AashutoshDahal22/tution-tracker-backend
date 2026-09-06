import { Router } from "express";
import dashboardController from "@/controllers/dashboard.controller.js";
import { authenticate } from "@/middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /dashboard:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Get dashboard stats
 *     description: Returns aggregated totals, this-month overview, top students, and recent sessions for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardStats'
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", dashboardController.getStats);

export default router;
