import { EntityRepository } from "@mikro-orm/core";
import { FastifyInstance, FastifyRequest, FastifyBaseLogger } from "fastify";
import { Product, IProduct } from './entity';

export class ProductManager {
    static init(fastify: FastifyInstance, request: FastifyRequest) {
        const ProductRepository = request.em.getRepository(Product);
        return new ProductManager(ProductRepository, fastify.log);
      }
      public constructor(
        private productRepository: EntityRepository<Product>,
        private logger: FastifyBaseLogger
      ) {}

  async getAllProducts(): Promise<Product[]|void> {
    try {
        return this.productRepository.findAll();
    } catch (error) {
        this.logger.error(`ProductManager - getAllProducts - Error: ${error}`);
    }
  }

  async getProductById(id: string): Promise<Product | null | void> {
    try {
        return this.productRepository.findOne({ id });
    } catch (error) {
        this.logger.error(`ProductManager - getProductById - Error: ${error}`);
    }
  }

  async createProduct(data: IProduct): Promise<Product | void> {
    try {
        const product = new Product(data);
        await this.productRepository.getEntityManager().persistAndFlush(Product)
        this.logger.info(
            `ProductManager - add - Success ID: ${product.id}`
        );
        return product;
        
    } catch (error) {
        this.logger.error(`productManager - create - Error: ${error}`);
    }
  }

  async updateProduct(id: string, data: Partial<IProduct>): Promise<Product | null | void> {
    try {
        
        const product = await this.productRepository.findOne({ id });
        if (product) {
          Object.assign(Product, data);
          await this.productRepository.getEntityManager().persistAndFlush(Product);
        }
        return product;
    } catch (error) {
        this.logger.error(`ProductManager - updateProduct - Error: ${error}`);
    }
  }

  async deleteProduct(id: string): Promise<boolean | void> {
    try {
        const product = await this.productRepository.findOne({ id });
        if (product) {
          await this.productRepository.getEntityManager().remove(Product);
          return true;
        }
        return false;
    } catch (error) {
        this.logger.error(`ProductManager - deleteProduct - Error: ${error}`);
    }
  }
}
