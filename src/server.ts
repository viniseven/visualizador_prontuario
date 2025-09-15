import fastify from "fastify";
import "dotenv/config";
import { usersRoutes } from "./routes/users.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = fastify();

app.setErrorHandler(errorHandler);

app.register(usersRoutes);

app.listen({ port: Number(process.env.PORT) }).then(() => {
  console.log("Server is running");
});
