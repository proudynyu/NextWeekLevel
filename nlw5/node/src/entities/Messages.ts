import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'

@Entity('Messages')
export class Messages {
  @PrimaryColumn()
  id: string

  @Column()
  admin_id: string

  // Foreign Key
  @Column()
  user_id: string

  @Column()
  text: string

  @CreateDateColumn()
  create_at: Date

  constructor() {
    if (!this.id) this.id = v4()
  }
}
