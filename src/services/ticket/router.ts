import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { TicketManager } from "./manager";
import { TicketController } from "./controller";
import { TicketParamsSchema, TicketSchema } from "./interface";
import { UserManager } from "../user";

export async function OrganizationRouter(
  fastify: FastifyInstance
): Promise<void> {
  fastify.decorateRequest("ticketManager", null);
  fastify.decorateRequest("userManager", null);
  fastify.addHook(
    "preHandler",
    function (request: FastifyRequest, reply: FastifyReply, done) {
      request.ticketManager = TicketManager.init(fastify, request);
      request.userManager = UserManager.init(fastify, request);
      done();
    }
  );

  fastify.post(
    "/user",
    {
        schema: {
          body: TicketSchema,
        },
    },
    TicketController.createTicket
  );

  fastify.get(
    "/user",
    {
        schema: {
          params: TicketParamsSchema,
        },
    },
    TicketController.getTicketById
  );

}

declare module "fastify" {
  export interface FastifyRequest {
    ticketManager: TicketManager;
    userManager: UserManager;
  }
}
