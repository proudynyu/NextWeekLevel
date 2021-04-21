import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
  private userService = new UserService()

  async create(req: Request, res: Response): Promise<Response>  {
    const { email } = req.body
    try {
      const user = await this.userService.create({ email })
      return res.status(201).json(user)
    } catch (e) {
      console.log(e.message)
    }
  }
}
