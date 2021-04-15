import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import { User } from '../models/User'

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body

    try {
      const userRepository = getRepository(User)

      const userAlreadyExists = await userRepository.findOne({
        email,
      })

      if (userAlreadyExists)
        res.status(400).json({ error: 'user already exists' })

      const user = userRepository.create({
        name,
        email,
      })

      await userRepository.save(user)
      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
    }
  }

  async index() {}

  async delete() {}

  async update() {}
}
