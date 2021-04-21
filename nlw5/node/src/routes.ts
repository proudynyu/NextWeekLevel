import { Router } from 'express'
import { SettingsController } from './controller/SettingsController'

const router = Router()
const settingsController = new SettingsController()

router.get('/', (req, res) => res.json({ msg: 'hi' }))

router.get('/settings', settingsController.index)
router.get('/settings/:id', settingsController.showOne)
router.post('/settings', settingsController.create)
router.delete('/settings/:id', settingsController.delete)

// router.get('/users', usersController.index)
// router.get('/users/:id', usersController.showOne)
// router.post('/users', usersController.create)
// router.delete('/users/:id', usersController.delete)

export { router }
