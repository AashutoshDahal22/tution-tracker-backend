import type { Request, Response } from "express";
import sessionService from "@/services/session.service.js";
import AppError from "@/utils/AppError.js";
import { asyncHandler } from "@/utils/asyncHandler.js";

const create = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const session = await sessionService.create(userId, req.body);

  res.status(201).json({
    success: true,
    message: "Session created successfully.",
    data: session,
  });
});

const getAll = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const sessions = await sessionService.getAll(userId);

  res.status(200).json({
    success: true,
    data: sessions,
  });
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    throw new AppError("Invalid session ID.", 400);
  }

  const session = await sessionService.getById(userId, id);

  res.status(200).json({
    success: true,
    data: session,
  });
});

const update = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    throw new AppError("Invalid session ID.", 400);
  }

  const session = await sessionService.update(userId, id, req.body);

  res.status(200).json({
    success: true,
    message: "Session updated successfully.",
    data: session,
  });
});

const remove = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    throw new AppError("Invalid session ID.", 400);
  }

  await sessionService.remove(userId, id);

  res.status(200).json({
    success: true,
    message: "Session deleted successfully.",
  });
});

const sessionController = {
  create,
  getAll,
  getById,
  update,
  remove,
};

export default sessionController;
