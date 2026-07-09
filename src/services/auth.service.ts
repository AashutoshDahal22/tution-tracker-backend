import bcrypt from "bcrypt";
import prisma from "@/lib/prisma.js";
import AppError from "@/utils/AppError.js";
import { generateToken } from "@/utils/jwt.js";
import type { CreateUserDto, LoginUserDto } from "@/types/user.types.js";
import { sanitizeUser, toUserCreateData } from "@/mappers/user.mapper.js";

const register = async (dto: CreateUserDto) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: dto.email,
    },
  });

  if (existingUser) {
    throw new AppError("User Already Exists", 409);
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  //creating the user
  const user = await prisma.user.create({
    data: toUserCreateData(dto, hashedPassword),
  });

  //generate jwt token
  const token = generateToken(user.id);

  //return user without password
  return {
    token,
    user: sanitizeUser(user),
  };
};

const login = async ({ email, password }: LoginUserDto) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // Compare entered password with hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  // Generate JWT
  const token = generateToken(user.id);

  // Return token and user
  return {
    token,
    user: sanitizeUser(user),
  };
};

const me = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return sanitizeUser(user);
};

const authService = {
  register,
  login,
  me,
};

export default authService;
