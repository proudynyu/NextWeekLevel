import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'

@Entity('Connections')
export class Connections {
  @PrimaryColumn()
  id: string

  @Column()
  admin_id: string

  // Foreign Key
  @Column()
  user_id: string

  @CreateDateColumn()
  create_at: Date

  @CreateDateColumn()
  update_at: Date

  constructor() {
    if (!this.id) this.id = v4()
  }
}
