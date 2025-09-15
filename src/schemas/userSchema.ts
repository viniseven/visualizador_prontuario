import { z } from "zod";

export const createUserSchema = z
  .object({
    firstName: z.string().nonempty({ error: "O nome é obrigatório" }),
    lastName: z.string().nonempty({ error: "O sobrenome é obrigatório" }),
    email: z
      .email({ error: "Email inválido" })
      .nonempty({ error: "O email é obrigatório" }),
    phoneNumber: z.string().max(11, { error: "Número de telefone inválido" }),
    password: z
      .string()
      .min(8, { error: "A senha deverá conter pelo menos 8 caracteres" })
      .nonempty({ error: "A senha é obrigatória" }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export type CreateUserSchema = z.infer<typeof createUserSchema>;
