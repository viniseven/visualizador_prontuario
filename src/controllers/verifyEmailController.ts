import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

const verifyTokenSchema = z.object({
  token: z.string().nonempty({ error: "O link é inválido" }),
});

class VerifyEmailController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { token } = verifyTokenSchema.parse(request.query);

      const { sub } = reply.server.jwt.verify(token);

      reply.send({ userId: sub });
    } catch (error) {}

    reply.code(401).send({ message: "Token expirado ou inválido" });
  }
}

export default VerifyEmailController;
