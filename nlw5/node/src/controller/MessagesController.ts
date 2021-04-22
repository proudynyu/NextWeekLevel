import { Request, Response } from 'express'
import { MessagesService } from '../services/MessagesService'

export class MessagesController {
  private messagesService = new MessagesService()

  async create(req: Request, res: Response) {
    const { admin_id, text, user_id } = req.body
    try {
      const message = await this.messagesService.create({
        admin_id,
        text,
        user_id,
      })

      return res.status(201).json(message)
    } catch ({ message }) {
      return res.status(500).json({ error: message })
    }
  }

  async showByUser(req: Request, res: Response) {
    const { user_id } = req.params

    try {
      const list = await this.messagesService.listByUser(user_id)

      return res.status(200).json(list)
    } catch ({ message }) {
      return res.status(500).json({ error: message })
    }
  }
}
