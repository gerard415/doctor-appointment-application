import express from 'express'
const router = express.Router()

import { register, login, logout, getUser } from '../controllers/auth'


router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/user', getUser)

export = router
