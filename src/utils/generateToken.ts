import { type FastifyReply } from "fastify";
import { env } from "../env/index.js";

export async function generateToken(idUser: string, reply: FastifyReply) {
  return await reply.jwtSign(
    {},
    {
      sign: {
        sub: idUser,
        expiresIn: env.JWT_TOKEN_AUTHENTICATION_EXPIRES_IN,
      },
    }
  );
}
