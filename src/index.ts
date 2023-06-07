import 'reflect-metadata';
import Fastify, { FastifyInstance } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import {
  CustomLogger,
  MikroPlugin,
  ConfigPlugin
} from "./plugin";

async function server() {
  const fastify: FastifyInstance = Fastify({
    logger: CustomLogger,
  });
  fastify.register(ConfigPlugin);
  fastify.register(MikroPlugin);
  // Register plugins
  fastify.register(fastifyJwt, {
    secret: process.env.SECRET_KEY || "some-key",
  });


  try {
    await fastify.ready();
  } catch (e) {
    fastify.log.fatal(`Unable to initialize plugins due to ${e}`);
    process.exit(1);
  }

  console.log("🚀 ~ file: index.ts:32 ~ server ~ fastify.config.Server.Port:", fastify.config)
  fastify.listen(
    {
      port: fastify.config.Server.Port,
      host: "0.0.0.0",
    },
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
}

server();

