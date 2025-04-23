"use server";

import { prisma } from "@/config/prisma.config";
import {
  CreateUser,
  CreateUserResponse,
  createUserResponseSchema,
} from "@/modules/users/schemas/user.schema";

export const createUser = async (user: CreateUser): Promise<CreateUserResponse> => {
  const newUser = await prisma.users.create({
    data: {
      clerkId: user.clerkId,
      email: user.email,
      username: user.username,
      photo: user.photo,
    },
  });

  return createUserResponseSchema.parse(newUser);
};

// export const updateUser = async (user: User) => {};

// export const deleteUser = async (user: User) => {};

// export const getUserById = async (user: User) => {};
