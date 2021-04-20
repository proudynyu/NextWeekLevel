import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'

@Entity('Surveys')
export class Surveys {
  @PrimaryColumn()
  readonly id: string

  @Column()
  title: string

  @Column()
  description: string

  @CreateDateColumn()
  create_at: Date

  constructor() {
    if (!this.id) this.id = v4()
  }
}
