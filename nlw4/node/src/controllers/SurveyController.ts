import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveyRepository } from '../repositories/SurveyRepository'

export class SurveyController {
  private surveyRepository: SurveyRepository

  constructor() {
    this.surveyRepository = getCustomRepository(SurveyRepository)
  }

  async create(req: Request, res: Response) {
    const { title, description } = req.body

    try {
      const survey = this.surveyRepository.create({
        title,
        description,
      })

      await this.surveyRepository.save(survey)

      return res.status(201).json(survey)
    } catch (e) {
      console.log(e)
    }
  }

  async showAll(req: Request, res: Response) {
    try {
      const surveys = await this.surveyRepository.find()

      return res.status(200).json(surveys)
    } catch (e) {
      console.log(e)
    }
  }

  async showUnique(req: Request, res: Response) {
    const { id } = req.params

    try {
      const uniqueSurvey = await this.surveyRepository.findOne(id)

      return res.status(200).json(uniqueSurvey)
    } catch (e) {
      console.log(e)
    }
  }
}
