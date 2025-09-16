import { type FastifyReply, type FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { createUserSchema } from "../schemas/userSchema.js";
import { hashPassword } from "../utils/bcrypt.js";
import { generateTokenVerifyEmail } from "../utils/generateTokenVerify.js";
import { env } from "../env/index.js";
import { handlerSendEmail } from "../utils/sendEmailVerify.js";

const prisma = new PrismaClient();

class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const data = createUserSchema.parse(request.body);

    const findUserWithEmail = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (findUserWithEmail) {
      reply.code(400).send({ message: "Este email já está em uso" });
    }

    const hashedPassword = await hashPassword(data.password);

    try {
      const user = await prisma.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          department: data.department,
          role: data.role,
          password: hashedPassword,
        },
      });

      const token = await generateTokenVerifyEmail(user.id, reply);
      const urlVerifyRegisterUser = env.API_BASE_URL + token;
      await handlerSendEmail(user, urlVerifyRegisterUser);

      if (!handlerSendEmail) {
        reply.code(500).send({ message: "Erro interno do servidor" });
      }

      reply
        .code(200)
        .send({ message: "Email da validação enviado com sucesso" });
    } catch (error) {
      reply.code(500).send({ message: "Ocorreu um erro, tente novamente" });
    }
  }
}

export default UserController;
