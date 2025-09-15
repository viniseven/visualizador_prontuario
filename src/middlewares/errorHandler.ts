import {
  type FastifyError,
  type FastifyRequest,
  type FastifyReply,
} from "fastify";
import { ZodError } from "zod";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: error.issues[0]?.message,
    });
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
}
