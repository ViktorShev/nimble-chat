import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Message } from './message.js'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  username: string

  @Column({ type: 'text' })
  password: string

  @OneToMany(() => Message, (message) => message.createdByUser)
  messages: Message[]
}