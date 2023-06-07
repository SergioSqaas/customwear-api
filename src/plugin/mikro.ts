import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import config from '../mikro-orm.config'
import { MikroORM, IDatabaseDriver, EntityManager } from '@mikro-orm/core'

const fastifyMikro = async (fastify: FastifyInstance) => {
    let orm: any;
    try {
      orm = await MikroORM.init<IDatabaseDriver>(config);
    } catch (error) {
      throw new Error(`${error}`);
    }
  
    fastify.decorate("orm", orm);
    fastify.addHook("onRequest", async (request) => {
      request.em = orm.em.fork();
    });
    fastify.addHook("onClose", (fastify) => fastify.orm.close(true));
  };
  
  declare module "fastify" {
    export interface FastifyInstance {
      orm: MikroORM;
    }
  
    export interface FastifyRequest {
      em: EntityManager;
    }
  }
  
  export const MikroPlugin = fp(fastifyMikro, { name: "fastify-mikro" });