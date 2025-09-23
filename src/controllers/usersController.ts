import { type FastifyReply, type FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { createUserSchema } from "../schemas/userSchema.js";
import { generateToken } from "../utils/generateToken.js";
import { env } from "../env/index.js";
import { handlerSendEmail } from "../utils/sendEmailVerify.js";
import bcrypt from "bcrypt";

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
      return reply.code(400).send({ message: "Este email já está em uso" });
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      env.SALT_ROUND_HASH
    );

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

      const token = await generateToken(user.id, reply);
      const urlVerifyRegisterUser = `${env.API_BASE_URL}/verify-email?token=${token}`;
      await handlerSendEmail(user, urlVerifyRegisterUser);

      if (!handlerSendEmail) {
        return reply.code(500).send({ message: "Erro interno do servidor" });
      }

      return reply
        .code(200)
        .send({ message: "Email da validação enviado com sucesso", token });
    } catch (error) {
      return reply
        .code(500)
        .send({ message: "Ocorreu um erro, tente novamente" });
    }
  }
}

export default UserController;
