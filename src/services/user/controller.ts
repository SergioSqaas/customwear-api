import { FastifyRequest, FastifyReply } from 'fastify';
import { UserParamsType, UserType } from './interface';

export class UserController {

  public static getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    const users = await req.userManager.getAllUsers();
    reply.send(users);
  }

  public static getUserById = async (req: FastifyRequest<{
    Params: UserParamsType;
  }>, reply: FastifyReply) => {
    const { UserId } = req.params;
    const user = await req.userManager.getUserById(UserId);
    if (user) {
      reply.send(user);
    } else {
      reply.code(404).send({ message: 'User not found' });
    }
  }

  public static createUser = async (req: FastifyRequest<{
    Body: UserType;
  }>, reply: FastifyReply) => {
    const user = await req.userManager.createUser(req.body);
    reply.code(201).send(user);
  }

  public static updateUser = async (req: FastifyRequest<{
    Params: UserParamsType;
    Body: UserType;
  }>, reply: FastifyReply) => {
    const { UserId } = req.params;
    const user = await req.userManager.updateUser(UserId, req.body);
    if (user) {
      reply.send(user);
    } else {
      reply.code(404).send({ message: 'User not found' });
    }
  }

}
