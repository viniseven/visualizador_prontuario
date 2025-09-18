import { type FastifyReply, type FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class VerifyEmailController {
  async validate(request: FastifyRequest, reply: FastifyReply) {
    const { sub: userId } = request.user;

    const findUserWithId = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!findUserWithId) {
      return reply.code(404).send({ message: "Usuário não encontrado" });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isVerified: true,
      },
    });

    return reply.code(200).send({ message: "Usuário verificado com sucesso" });
  }
}

export default VerifyEmailController;
