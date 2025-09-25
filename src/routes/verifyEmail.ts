import type { FastifyInstance } from "fastify";
import VerifyEmail from "../controllers/verifyEmail.js";
import { verifyTokenValidation } from "../hooks/verifyTokenEmail.js";

const verifyEmailController = new VerifyEmail();

export async function verifyRoutes(app: FastifyInstance) {
  app.get(
    "/verify-email",
    { preHandler: [verifyTokenValidation] },
    verifyEmailController.validate
  );
}
