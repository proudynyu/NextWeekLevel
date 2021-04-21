import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 } from 'uuid'
import { Users } from './Users'

@Entity('Messages')
export class Messages {
  @PrimaryColumn()
  id: string

  @Column()
  admin_id: string

  // Foreign Key
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => Users)
  user: Users

  @Column()
  user_id: string
  // end foreign

  @Column()
  text: string

  @CreateDateColumn()
  create_at: Date

  constructor() {
    if (!this.id) this.id = v4()
  }
}
