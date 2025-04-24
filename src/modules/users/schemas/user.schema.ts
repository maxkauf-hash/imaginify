import { z } from "zod";

export const createUserserSchema = z.object({
  clerkId: z.string(),
  email: z.string(),
  username: z.string(),
  photo: z.string(),
});

export type CreateUser = z.infer<typeof createUserserSchema>;

export const createUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  photo: z.string(),
});

export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;

export const updateUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  photo: z.string(),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;

export const updateUserResponseSchema = z.object({
  id: z.string(),
});

export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>;

export const deleteUserSchema = z.object({
  id: z.string(),
});

export type DeleteUser = z.infer<typeof deleteUserSchema>;

export const deleteUserResponseSchema = z.object({
  id: z.string(),
});

export type DeleteUserResponse = z.infer<typeof deleteUserResponseSchema>;

export const getUserByIdSchema = z.object({
  id: z.string(),
});

export type GetUserById = z.infer<typeof getUserByIdSchema>;

export const getUserByIdResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  photo: z.string(),
  planId: z.number(),
  creditBalance: z.number(),
  images: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        transformationType: z.string(),
        publicId: z.string(),
        secureURL: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
        config: z.any().optional(),
        transformationUrl: z.string().optional(),
        aspectRatio: z.string().optional(),
        color: z.string().optional(),
        prompt: z.string().optional(),
        authorId: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })
    )
    .optional(),
  transactions: z
    .array(
      z.object({
        id: z.string(),
        createdAt: z.date(),
        stripeId: z.string(),
        amount: z.number(),
        plan: z.string().optional(),
        credits: z.number().optional(),
        buyerId: z.string(),
      })
    )
    .optional(),
});

export type GetUserByIdResponse = z.infer<typeof getUserByIdResponseSchema>;
