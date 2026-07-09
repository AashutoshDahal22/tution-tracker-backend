import type { Request, Response } from "express";
import authService from "@/services/auth.service.js";
import { asyncHandler } from "@/utils/asyncHandler.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.me(req.user.userId);

  res.status(200).json({
    success: true,
    data: result,
  });
});
