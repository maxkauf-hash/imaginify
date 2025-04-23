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
