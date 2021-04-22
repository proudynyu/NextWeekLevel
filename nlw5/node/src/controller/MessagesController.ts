import { Request, Response } from 'express'
import { MessagesService } from '../services/MessagesService'

export class MessagesController {
  private messagesService = new MessagesService()
  async create(req: Request, res: Response) {
    const {} = req.body
    try {
      
    } catch ({message}) {
      console.log(message)
    }
  }
}
