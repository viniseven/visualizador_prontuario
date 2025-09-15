import { type FastifyReply, type FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { createUserSchema } from "../schemas/userSchema.js";
import { hashPassword } from "../utils/bcrypt.js";

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

    await prisma.user.create({
      data: {
        firstName: data.firstName,
        secondName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: hashedPassword,
      },
    });

    reply.code(201).send({ message: "Usuário criado com sucesso" });
  }
}

export default UserController;
