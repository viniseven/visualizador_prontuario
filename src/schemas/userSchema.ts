import { z } from "zod";

export const createUserSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    phoneNumber: z.string().max(11),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export type CreateUserSchema = z.infer<typeof createUserSchema>;
