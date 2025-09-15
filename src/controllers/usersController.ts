import { type FastifyReply, type FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { createUserSchema } from "../schemas/userSchema.js";
import { hashPassword } from "../utils/bcrypt.js";

const prisma = new PrismaClient();

class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const data = createUserSchema.parse(request.body);

    const findUserWithEmail = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (findUserWithEmail) {
      reply.code(400).send({ message: "Este email já está em uso" });
    }

    const hashedPassword = await hashPassword(data.password);

    try {
      const user = await prisma.user.create({
        data: {
          firstName: data.firstName,
          secondName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          department: data.department,
          role: data.role,
          password: hashedPassword,
        },
      });
      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
          },
        }
      );

      reply.code(201).send({ user, token });
    } catch (error) {}
  }
}

export default UserController;
