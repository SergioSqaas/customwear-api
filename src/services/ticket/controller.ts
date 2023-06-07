import { FastifyRequest, FastifyReply } from 'fastify';
import { TicketParamsType, TicketPartialType, TicketType } from './interface';
import { TicketStatus } from './entity';
import { stat } from 'fs/promises';

export class TicketController {

  public static getAllTickets = async (req: FastifyRequest, reply: FastifyReply) => {
    const tickets = await req.ticketManager.getAllTickets();
    reply.send(tickets);
  }

  public static getTicketById = async (req: FastifyRequest<{
    Params: TicketParamsType;
  }>, reply: FastifyReply) => {
    const { ticketId } = req.params;
    const ticket = await req.ticketManager.getTicketById(ticketId);
    if (ticket) {
      reply.send(ticket);
    } else {
      reply.code(404).send({ message: 'ticket not found' });
    }
  }

  public static createTicket = async (req: FastifyRequest<{
    Body: TicketType;
  }>, reply: FastifyReply) => {
    const {user } = req.body
    const userTicket = await req.userManager.getUserById(user)

    if(!userTicket) throw Error('User not exits')
    const ticket = await req.ticketManager.createTicket({
        user: userTicket,
        totalAmount: 0,
        status: TicketStatus.PENDING_PAY
    });
    reply.code(201).send(ticket);
  }

  public static updateTicket = async (req: FastifyRequest<{
    Params: TicketParamsType;
    Body: TicketPartialType;
  }>, reply: FastifyReply) => {
    const { ticketId } = req.params;
    const { totalAmount, status} = req.body
    const ticket = await req.ticketManager.updateTicket(ticketId, { totalAmount, status: TicketStatus[status as keyof typeof TicketStatus]});
    if (ticket) {
      reply.send(ticket);
    } else {
      reply.code(404).send({ message: 'ticket not found' });
    }
  }

}
