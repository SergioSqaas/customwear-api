import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { UserManager } from "./manager";
import { UserController } from "./controller";
import { UserParamsSchema, UserSchema } from "./interface";

export async function OrganizationRouter(
  fastify: FastifyInstance
): Promise<void> {
  fastify.decorateRequest("userManager", null);
  fastify.addHook(
    "preHandler",
    function (request: FastifyRequest, reply: FastifyReply, done) {
      request.userManager = UserManager.init(fastify, request);
      done();
    }
  );

  fastify.post(
    "/user",
    {
        schema: {
          body: UserSchema,
        },
    },
    UserController.createUser
  );

  fastify.get(
    "/user",
    {
        schema: {
          params: UserParamsSchema,
        },
    },
    UserController.getUserById
  );

}

declare module "fastify" {
  export interface FastifyRequest {
    userManager: UserManager;
  }
}
