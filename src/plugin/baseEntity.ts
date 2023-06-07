import { Entity } from '@mikro-orm/core'
import { PrimaryKey } from '@mikro-orm/core'
import { v4 } from 'uuid'

@Entity({ abstract: true })

export abstract class BaseEntity {
    @PrimaryKey({ type: 'uuid' })
    public id: string

    public constructor(data: IBaseEntity) {
        if (!data.id) {
            data.id = v4()
        }
        this.id = data.id
    }
}

export interface IBaseEntity {
    id?: string
}
