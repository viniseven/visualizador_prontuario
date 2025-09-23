import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email({ error: "Email inválido" })
    .nonempty({ error: "O email é obrigatório" }),
  password: z.string().nonempty({ error: "A senha é obrigatória" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
