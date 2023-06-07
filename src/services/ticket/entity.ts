import { Entity, Property, OneToOne, ManyToOne, ManyToMany, Collection, PrimaryKey } from '@mikro-orm/core';
import { Order } from '../order/entity/entity';
import { User } from '../user/entity';
import { Product } from '../product/entity/entity';
import { BaseEntity } from '../../plugin/baseEntity'

@Entity()
export class Ticket extends BaseEntity{

  @OneToOne(() => Order, { eager: true })
  order?: Order;

  @ManyToOne(() => User)
  user!: User;

  @Property()
  totalAmount!: number;

  @Property()
  status: TicketStatus;

  @ManyToMany(() => Product)
  products: Collection<Product> = new Collection<Product>(this);

  constructor(data: ITicket) {
    super(data);
    this.order = data.order;
    this.user = data.user;
    this.totalAmount = data.totalAmount;
    this.status = data.status;
  }
}
export interface ITicket {
  id?: string
  order?: Order
  user: User
  totalAmount: number
  status: TicketStatus
}

export enum TicketStatus {
  PAID = 'Paid',
  CANCELLATED = 'Cancellated',
  RETURNED = 'Returned',
  PENDING_PAY = 'Pending pay',
}