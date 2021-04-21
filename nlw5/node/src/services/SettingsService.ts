import { getCustomRepository } from 'typeorm'
import { SettingsRepository } from '../repositories/SettingRepository'

interface ISettingsCreate {
  chat: boolean
  username: string
}

export class SettingsService {
  private settingRepository = getCustomRepository(SettingsRepository)

  async create({ chat, username }: ISettingsCreate) {
    const settingsExists = this.settingRepository.findOne({ username })
    if (settingsExists) throw new Error('Settings already exists')

    const settings = this.settingRepository.create({ username, chat })

    await this.settingRepository.save(settings)

    return settings
  }
}
