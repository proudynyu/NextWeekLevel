import { EntityRepository, Repository } from 'typeorm'
import { Surveys } from '../models/Surveys'

@EntityRepository(Surveys)
export class SurveyRepository extends Repository<Surveys> {}
