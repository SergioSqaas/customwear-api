import { Entity, Property, OneToOne, PrimaryKey } from '@mikro-orm/core';
import { Ticket } from '../../ticket/entity';
import { BaseEntity } from '../../../plugin/baseEntity'

@Entity()
export class Order extends BaseEntity {

  @Property()
  status!: OrderStatus;

  @Property()
  estimateDate!: Date;

  @OneToOne(() => Ticket)
  ticket!: Ticket;

  @Property()
  address!: string;

  constructor(data: IOrder) {
    super(data);
    this.status = data.status;
    this.estimateDate = data.estimateDate;
    this.ticket = data.ticket;
    this.address = data.address;
  }
}

export interface IOrder {
  id: string
  ticket: Ticket;
  status: OrderStatus
  estimateDate: Date
  address: string
}

export enum OrderStatus {
  IN_PROGRESS = 'In progress',
  CANCELLATED = 'Cancellated',
  DELIVERED = 'Delivered',
  REJECTED = 'Rejected',
}
