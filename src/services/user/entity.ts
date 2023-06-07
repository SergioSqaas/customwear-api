import { Entity, Property, OneToMany, Collection , PrimaryKey} from '@mikro-orm/core';
import { Ticket } from '../ticket/entity';
import { BaseEntity } from '../../plugin/baseEntity'

@Entity()
export class User extends BaseEntity{

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  phone!: string;

  @Property()
  address!: string;

  @OneToMany(() => Ticket, 'user')
  tickets = new Collection<Ticket>(this);

  constructor(data: IUser) {
    super(data);
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
  }
  
}

export interface IUser {
  id?: string
  name: string
  email: string
  address: string
  phone: string

}



