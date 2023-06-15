import { Entity, Property} from '@mikro-orm/core';
import { BaseEntity } from '../../plugin/baseEntity'

@Entity()
export class Product extends BaseEntity {

  @Property()
  type!: string;

  @Property()
  promptDescription: string | undefined;

  @Property()
  urlImage: string | undefined;

  @Property()
  price!: number;

  @Property()
  stock!: number;

  constructor(data: IProduct) {
    super(data);
    this.promptDescription = data.promptDescription;
    if (data.type) {
      this.type = data.type;
    }
    if (data.stock) {
      this.stock = data.stock;
    }
    if (data.price) {
      this.price = data.price;
    }
    this.urlImage = data.urlImage;
  }
}

export interface IProduct {
  id?: string
  type?: string
  promptDescription: string
  urlImage: string
  price?: number
  stock?: number
}

export enum TicketStatus {
  TSHIRT = 'tshirt',
}
