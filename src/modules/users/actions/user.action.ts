"use server";

import { prisma } from "@/config/prisma.config";
import {
  CreateUser,
  CreateUserResponse,
  createUserResponseSchema,
  DeleteUserResponse,
  deleteUserResponseSchema,
  GetUserById,
  GetUserByIdResponse,
  getUserByIdResponseSchema,
  UpdateUser,
  UpdateUserResponse,
  updateUserResponseSchema,
} from "@/modules/users/schemas/user.schema";

export const createUser = async (
  user: CreateUser
): Promise<CreateUserResponse> => {
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

export const updateUser = async (
  id: string,
  user: UpdateUser
): Promise<UpdateUserResponse> => {
  const updatedUser = await prisma.users.update({
    where: {
      id,
    },
    data: user,
  });
  return updateUserResponseSchema.parse(updatedUser);
};

export const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
  const deletedUser = await prisma.users.delete({
    where: {
      id,
    },
  });
  return deleteUserResponseSchema.parse(deletedUser);
};

export const getUserById = async (
  user: GetUserById
): Promise<GetUserByIdResponse> => {
  const userInfo = await prisma.users.findUnique({
    where: {
      id: user.id,
    },
    include: {
      images: true,
      transactions: true,
    },
  });
  return getUserByIdResponseSchema.parse(userInfo);
};
