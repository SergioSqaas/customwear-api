import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductParamsType, ProductPartialType, ProductType } from './interface';


export class ProductController {

  public static getAllProducts = async (req: FastifyRequest, reply: FastifyReply) => {
    const products = await req.productManager.getAllProducts();
    reply.send(products);
  }

  public static getProductById = async (req: FastifyRequest<{
    Params: ProductParamsType;
  }>, reply: FastifyReply) => {
    const { productId } = req.params;
    const product = await req.productManager.getProductById(productId);
    if (product) {
      reply.send(product);
    } else {
      reply.code(404).send({ message: 'product not found' });
    }
  }

  public static createProduct = async (req: FastifyRequest<{
    Body: ProductType;
  }>, reply: FastifyReply) => {

    const product = await req.productManager.createProduct(req.body);    
    if(!product) throw Error('User not exits')
  }

  public static updateProduct = async (req: FastifyRequest<{
    Params: ProductParamsType;
    Body: ProductPartialType;
  }>, reply: FastifyReply) => {
    const { productId } = req.params;
    const product = await req.productManager.updateProduct(productId, req.body);  
    if (product) {
      reply.code(200).send(product);
    } else {
      reply.code(404).send({ message: 'product not found' });
    }
  }

}
