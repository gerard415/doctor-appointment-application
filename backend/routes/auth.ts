import express from 'express'
const router = express.Router()

import { register, login, getProfile, editProfile, logout } from '../controllers/auth'


router.post('/register', register)
router.post('/login', login)
router.get('/profile', getProfile)
router.post('/logout', logout)
router.patch('/profile', editProfile)

export = router
