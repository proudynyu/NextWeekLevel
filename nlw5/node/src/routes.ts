import { Router } from 'express'
import { MessagesController } from './controller/MessagesController'
import { SettingsController } from './controller/SettingsController'
import { UserController } from './controller/UserController'

const router = Router()
const settingsController = new SettingsController()
const messagesController = new MessagesController()
const usersController = new UserController()

router.post('/settings', settingsController.create)

router.post('/users', usersController.create)

router.post('/messages', messagesController.create)
router.get('/messages/:user_id', messagesController.showByUser)

export { router }
