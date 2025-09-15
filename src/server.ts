import fastify from "fastify";
import { env } from "./env";
import { usersRoutes } from "./routes/users.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import fastifyJwt from "@fastify/jwt";

const app = fastify();

app.setErrorHandler(errorHandler);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRoutes);

app.listen({ port: Number(env.PORT) }).then(() => {
  console.log("Server is running");
});
