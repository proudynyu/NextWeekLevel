import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'

interface IUserCreate {
  email: string
}

export class UserService {
  private userRepository = getCustomRepository(UserRepository)

  async create({ email }: IUserCreate) {
    const userAlreadyExists = await this.userRepository.findOne({ email })

    if (userAlreadyExists) throw new Error('User already exists')

    const user = this.userRepository.create({ email })
    await this.userRepository.save(user)
    return user
  }
}
