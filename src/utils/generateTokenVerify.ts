import { type FastifyReply } from "fastify";
import { env } from "../env/index.js";

export async function generateTokenVerifyEmail(
  idUser: string,
  reply: FastifyReply
) {
  return await reply.jwtSign(
    {},
    {
      sign: {
        sub: idUser,
        expiresIn: env.JWT_TOKEN_VALIDATION_USER_EXPIRES_IN,
      },
    }
  );
}
