import type { FastifyInstance } from "fastify";
import User from "../controllers/users.js";

const userController = new User();

export async function usersRoutes(app: FastifyInstance) {
  app.post("/signup", userController.create);
}
