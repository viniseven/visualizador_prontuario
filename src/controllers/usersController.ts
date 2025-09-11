import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { firstName, lastName, email, phoneNumber, password } = request.body;

    const findUserWithEmail = prisma.user.findMany({
      where: email,
    });

    if (findUserWithEmail) {
      reply.code(400).send("Este endereço de email já está em uso");
    }
  }
}

export default UserController;
