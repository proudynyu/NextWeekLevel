import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("Settings")
export class Settings {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  chat: boolean;

  @CreateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  create_at: Date;

  constructor() {
    if (!this.id) this.id = v4();
  }
}
