import type { FastifyInstance } from "fastify";

import Authentication from "../controllers/authentication.js";

const authenticationController = new Authentication();

export async function authRoutes(app: FastifyInstance) {
  app.post("/signin", authenticationController.create);
}
