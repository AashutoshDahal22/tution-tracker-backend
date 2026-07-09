import type { Prisma, User } from "@prisma/client";
import type { CreateUserDto } from "@/types/user.types.js";

export const toUserCreateData = (
  dto: CreateUserDto,
  hashedPassword: string,
): Prisma.UserCreateInput => ({
  name: dto.name,
  email: dto.email,
  password: hashedPassword,
});

export const sanitizeUser = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
