import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SettingsRepository } from '../repositories/SettingRepository'

export class SettingsController {
  private settingRepository: SettingsRepository = getCustomRepository(
    SettingsRepository
  )

  async create(req: Request, res: Response) {
    const { username, chat } = req.body

    try {
      const settingAlreadyExists = await this.settingRepository.findOne(
        username
      )

      if (settingAlreadyExists)
        res.status(400).json({ error: 'Setting already exists' })

      const settings = this.settingRepository.create({ username, chat })
      await this.settingRepository.save(settings)

      return res.status(201).json(settings)
    } catch (e) {
      console.log(e)
    }
  }

  async index(req: Request, res: Response) {
    try {
      const allSettings = await this.settingRepository.find()

      if (!allSettings.length)
        res.status(400).json({ error: 'Nothing was found' })

      return res.status(200).json(allSettings)
    } catch (e) {
      console.log(e)
    }
  }

  async showOne(req: Request, res: Response) {
    const { id } = req.params

    try {
      const oneSetting = await this.settingRepository.findOne(id)

      if (!oneSetting)
        res.status(400).json({ id: id, error: 'This setting does not exists' })

      return res.status(200).json(oneSetting)
    } catch (e) {
      console.log(e)
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      const oneSetting = await this.settingRepository.findOne(id)

      if (!oneSetting)
        res.status(400).json({ id: id, error: 'This setting does not exists' })

      const response = await this.settingRepository.delete(oneSetting)
      return res.status(200).json(response)
    } catch (e) {
      console.log(e)
    }
  }
}
