import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => res.json({ msg: 'hi' }))

export { router }