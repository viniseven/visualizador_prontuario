import type { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/");
}
