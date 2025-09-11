import type { FastifyInstance } from "fastify";
import UserController from "../controllers/usersController.js";

const usersController = new UserController();

export async function usersRoutes(app: FastifyInstance) {
  app.post("/signup", usersController.create);
}
