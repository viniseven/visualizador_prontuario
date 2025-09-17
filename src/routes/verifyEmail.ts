import type { FastifyInstance } from "fastify";
import VerifyEmailController from "../controllers/verifyEmailController.js";

const verifyEmailController = new VerifyEmailController();

export async function verifyRoutes(app: FastifyInstance) {
  app.get("/verify-email", verifyEmailController.create);
}
