import { FastifyInstance } from "fastify";
import FastifyEnv from "@fastify/env";
import DotEnv from "dotenv";
import fp from "fastify-plugin";

DotEnv.config()

const schema = {
    type: 'object',
    required: ['Server', 'Database'],
    properties: {
        Server: {
            type: 'object',
            required: ['Port', 'Host'],
            properties: {
                Port: {
                    type: 'number',
                    default: 8080,
                },
                Host: {
                    type: 'string',
                    default: 'localhost',
                },
                Secure: {
                    type: 'boolean',
                    default: false,
                },
                BaseURI: {
                    type: 'string',
                    default: 'http://localhost:8080',
                },
                SecretKey: {
                    type: 'string',
                    default: 'some-key',
                }
            },
        },
        Database: {
            type: 'object',
            required: ['User', 'Password', 'Host', 'Port', 'Db'],
            properties: {
                User: {
                    type: 'string',
                    default: 'Truman',
                },
                Password: {
                    type: 'string',
                    default: 'Capote',
                },
                Host: {
                    type: 'string',
                    default: 'localhost',
                },
                Port: {
                    type: 'number',
                    default: 5432,
                },
                Db: {
                    type: 'string',
                    default: 'voicesfy',
                },
                Debug: {
                    type: 'boolean',
                    default: false,
                },
            },
        },
        log: {
            type: "object",
            properties: {
              level: {
                type: "string",
                default: "debug",
              },
              driver: {
                type: "string",
                default: "local",
              },
            },
          },
    },
}

export const configOptions = {
    confKey: 'config',
    schema: schema,
    data: {
        Server: {
            Port: process.env.PORT && Number(process.env.PORT),
            Host: process.env.HOST,
            BaseURI: process.env.SERVER_BASE_URI,
            SecretKey: process.env.SECRET_KEY,
        },
        Database: {
            User: process.env.POSTGRES_USER,
            Password: process.env.POSTGRES_PASSWORD,
            Host: process.env.POSTGRES_HOST,
            Port: process.env.PORT && Number(process.env.POSTGRES_PORT),
            Db: process.env.POSTGRES_DB_NAME,
            Debug: process.env.SHOW_DATABASE_DEBUGS,
        },
        log: {
            level: process.env.LOG_LEVEL,
            driver: process.env.LOG_DRIVER,
          },
    },
}

declare module 'fastify' {
    interface FastifyInstance {
        config: Config
    }

    interface FastifyRequest {
        config: Config
    }
}

export interface Config {
    Server: {
        Port: number
        Host: string
        BaseURI: string
        SecretKey: string
    }
    Database: {
        User: string
        Password: string
        Host: string
        Port: number
        Db: string
        Debug: boolean
    }
    log: {
        level: string;
        driver: string;
      };
}

export async function initConfig(fastify: FastifyInstance): Promise<void> {
    fastify.register(FastifyEnv, configOptions);
  
    fastify.decorateRequest("config", null);
    fastify.addHook("onRequest", async (req) => {
      req.config = configOptions.data as unknown as Config;
    });
  }
  
  export const ConfigPlugin = fp(initConfig, { name: "fastify-config" });
