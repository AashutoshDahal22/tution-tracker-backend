import type { Request, Response } from "express";
import studentService from "../services/student.service.js";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const create = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const student = await studentService.create(userId, req.body);

  res.status(201).json({
    success: true,
    message: "Student created successfully.",
    data: student,
  });
});

const getAll = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const students = await studentService.getAll(userId);

  res.status(200).json({
    success: true,
    data: students,
  });
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    throw new AppError("Invalid student ID.", 400);
  }

  const student = await studentService.getById(userId, id);

  res.status(200).json({
    success: true,
    data: student,
  });
});

const update = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    throw new AppError("Invalid student ID.", 400);
  }

  const student = await studentService.update(userId, id, req.body);

  res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    data: student,
  });
});

const remove = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    throw new AppError("Invalid student ID.", 400);
  }

  await studentService.remove(userId, id);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully.",
  });
});

const studentController = {
  create,
  getAll,
  getById,
  update,
  remove,
};

export default studentController;
