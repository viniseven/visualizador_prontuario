import fastify from "fastify";
import "dotenv/config";

const app = fastify();

app.listen({ port: Number(process.env.PORT) }).then(() => {
  console.log("Server is running");
});
