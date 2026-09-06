import type { Request, Response } from "express";
import dashboardService from "@/services/dashboard.service.js";
import AppError from "@/utils/AppError.js";
import { asyncHandler } from "@/utils/asyncHandler.js";

const getStats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const stats = await dashboardService.getStats(userId);

  res.status(200).json({
    success: true,
    data: stats,
  });
});

const dashboardController = { getStats };

export default dashboardController;
