import Fastify, { FastifyInstance } from 'fastify'
// import FastifyCors from '@fastify/cors'
// import multer from 'fastify-multer'
// import fastifyJwt from '@fastify/jwt'
// import { File } from 'fastify-multer/lib/interfaces'



export default class Server {
    private _fastify: FastifyInstance

    public constructor() {
        this._fastify = Fastify({
            logger: {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        translateTime: 'SYS:h:MM:ss TT Z o',
                        colorize: true,
                        ignore: 'pid,hostname',
                    },
                },
            },
            ajv: {
                customOptions: {
                    keywords: ['kind', 'modifier'],
                },
            },
            pluginTimeout: process.env.FASTIFY_PLUGIN_TIMEOUT ? +process.env.FASTIFY_PLUGIN_TIMEOUT : undefined,
        })

    }

    public get fastify(): FastifyInstance {
        return this._fastify
    }

    public async init(): Promise<void> {
        // wait for all plugins and initializers
        try {
            await this.fastify.ready()
        } catch (e) {
            this.fastify.log.fatal(`Unable to initialize plugins due to ${e}`)
            process.exit(1)
        }

        this.fastify.log.info(`\n${this.fastify.printRoutes()}`)

        const port: number = (process.env.PORT || 80) as number
        this.fastify.listen({ port: port, host: '0.0.0.0' }, (err: any) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
        })
    }
}
