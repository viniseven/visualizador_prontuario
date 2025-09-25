import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

const verifyTokenSchema = z.object({
  token: z.string().nonempty({ error: "O link é inválido" }),
});

export async function verifyTokenValidation(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { token } = verifyTokenSchema.parse(request.query);

    const decodedToken = reply.server.jwt.verify(token);

    request.user = decodedToken;
  } catch (error) {
    return reply.code(400).send({ message: "Link inválido ou expirado" });
  }
}
