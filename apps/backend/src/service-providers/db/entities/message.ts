import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.js'

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  content: string

  @CreateDateColumn({ type: 'timestamp' })
  @Index()
  createdAt: Date

  @ManyToOne(() => User, (user) => user.messages, { nullable: false })
  @Index()
  createdByUser: User
}