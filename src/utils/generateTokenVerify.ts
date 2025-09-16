import { type FastifyReply } from "fastify";

export async function generateTokenVerifyEmail(
  idUser: string,
  reply: FastifyReply
) {
  return await reply.jwtSign(
    {},
    {
      sign: {
        sub: idUser,
        expiresIn: 600,
      },
    }
  );
}
