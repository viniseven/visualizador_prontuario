import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  JWT_TOKEN_AUTHENTICATION_EXPIRES_IN: z.string(),
  JWT_TOKEN_VALIDATION_USER_EXPIRES_IN: z.string(),
  API_BASE_URL: z.string(),
  SERVICE: z.string(),
  HOST: z.string(),
  PORT_SMTP: z.coerce.number(),
  USER_MAIL: z.string(),
  PASS_MAIL: z.string(),
});

export const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid enviroment variables", _env.error.format());

  throw new Error("Invalid enviroment variables");
}

export const env = _env.data;
