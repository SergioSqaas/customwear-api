import { EntityRepository } from "@mikro-orm/core";
import { FastifyInstance, FastifyRequest, FastifyBaseLogger } from "fastify";
import { Ticket, ITicket } from './entity';

export class TicketManager {
    static init(fastify: FastifyInstance, request: FastifyRequest) {
        const ticketRepository = request.em.getRepository(Ticket);
        return new TicketManager(ticketRepository, fastify.log);
      }
      public constructor(
        private ticketRepository: EntityRepository<Ticket>,
        private logger: FastifyBaseLogger
      ) {}

  async getAllTickets(): Promise<Ticket[]|void> {
    try {
        return this.ticketRepository.findAll();
    } catch (error) {
        this.logger.error(`TicketManager - getAllTickets - Error: ${error}`);
    }
  }

  async getTicketById(id: string): Promise<Ticket | null | void> {
    try {
        return this.ticketRepository.findOne({ id });
    } catch (error) {
        this.logger.error(`TicketManager - getTicketById - Error: ${error}`);
    }
  }

  async createTicket(data: ITicket): Promise<Ticket | void> {
    try {
        const ticket = new Ticket(data);
        await this.ticketRepository.getEntityManager().persistAndFlush(ticket)
        this.logger.info(
            `OrganizationManager - add - Success ID: ${ticket.id}`
        );
        return ticket;
        
    } catch (error) {
        this.logger.error(`UserManager - create - Error: ${error}`);
    }
  }

  async updateTicket(id: string, data: Partial<ITicket>): Promise<Ticket | null | void> {
    try {
        
        const ticket = await this.ticketRepository.findOne({ id });
        if (ticket) {
          Object.assign(ticket, data);
          await this.ticketRepository.getEntityManager().persistAndFlush(ticket);
        }
        return ticket;
    } catch (error) {
        this.logger.error(`TicketManager - updateTicket - Error: ${error}`);
    }
  }

  async deleteTicket(id: string): Promise<boolean | void> {
    try {
        const ticket = await this.ticketRepository.findOne({ id });
        if (ticket) {
          await this.ticketRepository.getEntityManager().remove(ticket);
          return true;
        }
        return false;
    } catch (error) {
        this.logger.error(`TicketManager - deleteTicket - Error: ${error}`);
    }
  }
}
