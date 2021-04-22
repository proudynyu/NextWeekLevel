import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";

export class MessagesService {
  private messagesRepository = getCustomRepository(MessagesRepository)

  async create(){

  }
}