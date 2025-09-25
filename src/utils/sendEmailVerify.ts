import nodemailer from "nodemailer";
import { env } from "../env/index.js";
import { type CreateUserSchema } from "../schemas/userSchema.js";

type emailUserSchema = Pick<
  CreateUserSchema,
  "firstName" | "lastName" | "email" | "department" | "role"
>;

export async function sendEmailValidation(
  user: emailUserSchema,
  urlVerify: string
) {
  const transporter = nodemailer.createTransport({
    service: env.SERVICE,
    host: env.HOST,
    port: env.PORT_SMTP,
    secure: true,
    auth: {
      user: env.USER_MAIL,
      pass: env.PASS_MAIL,
    },
  });

  await transporter.sendMail({
    from: "Visualizador de prontuário <env.USER_MAIL>",
    to: user.email,
    subject: "Validação de cadastro",
    html: `<h2>Validação de cadastro de usuário</h2>
          <h3>Dados do usuário</h3>
          <p>Nome:${user.firstName} ${user.lastName}</p>
          <p>Email:${user.email}</p>
          <p>Setor:${user.department}</p>
          <p>Função:${user.role}</p>
          <link>${urlVerify}</link>
    `,
  });
}
