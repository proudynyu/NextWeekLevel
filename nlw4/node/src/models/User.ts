import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'

@Entity('Users')
export class User {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @CreateDateColumn()
  create_at: Date

  constructor(){
    if(!this.id) this.id = v4()
  }
}
