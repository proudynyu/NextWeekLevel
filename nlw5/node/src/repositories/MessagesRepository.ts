import { EntityRepository, Repository } from "typeorm";
import { Messages } from "../entities/Messages";

@EntityRepository(Messages)
export class MessagesRepository extends Repository<Messages>{}