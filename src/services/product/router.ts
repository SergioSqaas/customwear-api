import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ProductManager } from "./manager";
import { ProductController } from "./controller";
import { ProductParamsSchema, ProductPartialSchema, ProductSchema } from "./interface";
import { UserManager } from "../user";

export async function OrganizationRouter(
  fastify: FastifyInstance
): Promise<void> {
  fastify.decorateRequest("productManager", null);
  fastify.decorateRequest("userManager", null);
  fastify.addHook(
    "preHandler",
    function (request: FastifyRequest, reply: FastifyReply, done) {
      request.productManager = ProductManager.init(fastify, request);
      request.userManager = UserManager.init(fastify, request);
      done();
    }
  );

  fastify.post(
    "/product",
    {
        schema: {
          body: ProductSchema,
        },
    },
    ProductController.createProduct
  );

  fastify.get(
    "/product",
    {
        schema: {
          params: ProductParamsSchema,
        },
    },
    ProductController.getProductById
  );

  fastify.put(
    "/product/:productId",
    {
        schema: {
          body: ProductPartialSchema,
          params: ProductParamsSchema,
        },
    },
    ProductController.updateProduct
  );

}

declare module "fastify" {
  export interface FastifyRequest {
    productManager: ProductManager;
    userManager: UserManager;
  }
}
