import { type FastifyReply, type FastifyRequest } from "fastify";
import { loginSchema } from "../schemas/loginSchema.js";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class Authentication {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const data = loginSchema.parse(request.body);

    const findUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!findUser) {
      return reply.status(400).send({ error: "Email ou senha inválido" });
    }

    const matchedPassword = await bcrypt.compare(
      data.password,
      findUser?.password
    );

    if (!matchedPassword) {
      return reply.status(400).send({ error: "Email ou senha inválido" });
    }

    const token = await generateToken(findUser.id, reply);
    return reply.status(200).send({ findUser, token });
  }
}

export default Authentication;
