import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body

    try {
      const userRepository = getCustomRepository(UsersRepository)

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
      return res.status(201).json(user)
    } catch (error) {
      console.log(error)
    }
  }

  async index() {}

  async delete() {}

  async update() {}
}
