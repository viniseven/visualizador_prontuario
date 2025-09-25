import fastify from "fastify";
import { env } from "./env/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { usersRoutes } from "./routes/users.js";
import { verifyRoutes } from "./routes/verifyEmail.js";
import { authRoutes } from "./routes/auth.js";

import fastifyJwt from "@fastify/jwt";

const app = fastify();

app.setErrorHandler(errorHandler);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRoutes);
app.register(verifyRoutes);
app.register(authRoutes);

app.listen({ port: Number(env.PORT) }).then(() => {
  console.log("Server is running");
});
