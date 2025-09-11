import fastify from "fastify";
import "dotenv/config";
import { usersRoutes } from "./routes/users.js";

const app = fastify();

app.register(usersRoutes);

app.listen({ port: Number(process.env.PORT) }).then(() => {
  console.log("Server is running");
});
