import { z } from "zod";

export const patientSchema = z
  .object({
    medicalRecord: z.number().min(1, { error: "Prontuário é obrigatório" }),
    firstName: z.string().nonempty({ error: "O nome é obrigatório" }),
    lastName: z.string().nonempty({ error: "O sobrenome é obrigatório" }),
    birthDate: z.string(),
    cpf: z.string().length(11, { error: "CPF inválido" }),
    rg: z.string().length(7, { error: "RG inválido" }),
    phoneNumber: z.string().max(11, { error: "Número de telefone inválido" }),
    gender: z.string().nonempty({ error: "O gênero é obrigatório" }),
    address: z.string().nonempty({ error: "O endereço é obrigatório" }),
    city: z.string().nonempty({ error: "A cidade é obrigatória" }),
    state: z.string().nonempty({ error: "O estado é obrigatório" }),
    zipCode: z.string().length(8, { error: "CEP inválido" }),
  })
  .refine(
    (data) => {
      return data.birthDate > new Date().toISOString();
    },
    { error: "Data inválida, não pode ser maior que a atual" }
  );
