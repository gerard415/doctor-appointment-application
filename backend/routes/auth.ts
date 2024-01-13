import express from 'express'
const router = express.Router()

import { register, login, logout, getUser, upload } from '../controllers/auth'
import { photoMiddleware } from '../utils/multer'


router.post('/register', photoMiddleware.single('photo'), register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/user', getUser)
router.post('/upload', photoMiddleware.single('photo'), upload)

export = router
