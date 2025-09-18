import type { FastifyInstance } from "fastify";
import VerifyEmailController from "../controllers/verifyEmailController.js";
import { verifyTokenEmail } from "../hooks/verifyTokenEmail.js";

const verifyEmailController = new VerifyEmailController();

export async function verifyRoutes(app: FastifyInstance) {
  app.get(
    "/verify-email",
    { preHandler: [verifyTokenEmail] },
    verifyEmailController.validate
  );
}
