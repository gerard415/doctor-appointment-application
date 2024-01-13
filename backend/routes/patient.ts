import express from 'express'
const router = express.Router()

import { editPatient, getPatient, deletePatient, getPatientBookings, postDoctorReviews } from '../controllers/patient'
import { photoMiddleware } from '../utils/multer'

router.get('/profile', getPatient)
router.patch('/profile', photoMiddleware.single('photo'), editPatient)
router.delete('/profile', deletePatient)
router.get('/bookings', getPatientBookings)
router.post('/reviews', postDoctorReviews)

export = router