import { Entity, Property, ManyToMany, Collection, PrimaryKey } from '@mikro-orm/core';
import { BaseEntity } from '../../../plugin/baseEntity'

@Entity()
export class Product extends BaseEntity {

  @Property()
  type!: string;

  @Property()
  price!: number;

  @Property()
  stock!: number;

  constructor(data: IProduct) {
    super(data);
    this.type = data.type;
    this.price = data.price;
    this.stock = data.stock;
  }
}

export interface IProduct {
  id: string
  type: string
  price: number
  stock: number
}
