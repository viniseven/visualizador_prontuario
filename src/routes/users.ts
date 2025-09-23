import type { FastifyInstance } from "fastify";
import UserController from "../controllers/usersController.js";
import AuthenticationController from "../controllers/authenticationController.js";

const usersController = new UserController();
const authenticationController = new AuthenticationController();

export async function usersRoutes(app: FastifyInstance) {
  app.post("/signup", usersController.create);
  app.post("/signin", authenticationController.create);
}
