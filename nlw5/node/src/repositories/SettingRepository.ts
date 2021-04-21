import { EntityRepository, Repository } from 'typeorm'
import { Settings } from '../entities/Settings'

@EntityRepository(Settings)
export class SettingsRepository extends Repository<Settings> {}
