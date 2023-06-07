import { EntityRepository } from "@mikro-orm/core";
import { FastifyInstance, FastifyRequest, FastifyBaseLogger } from "fastify";
import { User, IUser } from './entity';

export class UserManager {
    static init(fastify: FastifyInstance, request: FastifyRequest) {
        const userRepository = request.em.getRepository(User);
        return new UserManager(userRepository, fastify.log);
      }
      public constructor(
        private userRepository: EntityRepository<User>,
        private logger: FastifyBaseLogger
      ) {}

  async getAllUsers(): Promise<User[]|void> {
    try {
        return this.userRepository.findAll();
    } catch (error) {
        this.logger.error(`UserManager - getAllUsers - Error: ${error}`);
    }
  }

  async getUserById(id: string): Promise<User | null | void> {
    try {
        return this.userRepository.findOne({ id });
    } catch (error) {
        this.logger.error(`UserManager - getUserById - Error: ${error}`);
    }
  }

  async createUser(data: IUser): Promise<User | void> {
    try {
        const user = new User(data);
        await this.userRepository.getEntityManager().persistAndFlush(user)
        this.logger.info(
            `OrganizationManager - add - Success ID: ${user.id}`
        );
        return user;
        
    } catch (error) {
        this.logger.error(`UserManager - create - Error: ${error}`);
    }
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null | void> {
    try {
        
        const user = await this.userRepository.findOne({ id });
        if (user) {
          Object.assign(user, data);
          await this.userRepository.getEntityManager().persistAndFlush(user);
        }
        return user;
    } catch (error) {
        this.logger.error(`UserManager - updateUser - Error: ${error}`);
    }
  }

  async deleteUser(id: string): Promise<boolean | void> {
    try {
        const user = await this.userRepository.findOne({ id });
        if (user) {
          await this.userRepository.getEntityManager().remove(user);
          return true;
        }
        return false;
    } catch (error) {
        this.logger.error(`UserManager - deleteUser - Error: ${error}`);
    }
  }
}
