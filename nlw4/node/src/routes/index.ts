import { Router } from 'express'
import { SurveyController } from '../controllers/SurveyController'
import { UserController } from '../controllers/UserController'

const router = Router()
const userController = new UserController()
const surveyController = new SurveyController()

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Hello There',
  })
})

router.post('/users', userController.create)

router.get('/surveys', surveyController.showAll)
router.get('/surveys/:id', surveyController.showUnique)
router.post('/surveys', surveyController.create)

export { router }
