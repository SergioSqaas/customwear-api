import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { TicketManager } from "./manager";
import { TicketController } from "./controller";
import { TicketParamsSchema, TicketPartialSchema, TicketSchema } from "./interface";
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
    "/ticket",
    {
        schema: {
          body: TicketSchema,
        },
    },
    TicketController.createTicket
  );

  fastify.get(
    "/ticket",
    {
        schema: {
          params: TicketParamsSchema,
        },
    },
    TicketController.getTicketById
  );

  fastify.put(
    "/ticket/:ticketId",
    {
        schema: {
          body: TicketPartialSchema,
          params: TicketParamsSchema,
        },
    },
    TicketController.updateTicket
  );

}

declare module "fastify" {
  export interface FastifyRequest {
    ticketManager: TicketManager;
    userManager: UserManager;
  }
}
