import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const register = async ({ name, email, password }: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError("User Already Exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  //creating the user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //generate jwt token
  const token = generateToken(user.id);

  //return user without password
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

const login = async ({ email, password }: LoginInput) => {
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
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

const me = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const authService = {
  register,
  login,
  me,
};

export default authService;
