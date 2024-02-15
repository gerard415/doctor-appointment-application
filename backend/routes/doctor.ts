import express from 'express'
const router = express.Router()

import {getDoctor, getDoctorProfile, getAllDoctors, editDoctor, deleteDoctor, getDoctorBookings, getDoctorReviews} from '../controllers/doctor'
import doctorAuthMiddleware = require('../middleware/doctorAuthentication')
import { postDoctorReviews, createPatientBookings } from '../controllers/patient'
import patientAuthMiddleware from '../middleware/patientAuthentication'
import { photoMiddleware } from '../utils/multer'

router.get('/:id', getDoctor)
router.get('/profile/me', doctorAuthMiddleware, getDoctorProfile)
router.get('/', getAllDoctors)
router.patch('/profile',photoMiddleware.single('photo'), doctorAuthMiddleware, editDoctor)
router.delete('/profile', doctorAuthMiddleware, deleteDoctor)
router.get('/profile/bookings', doctorAuthMiddleware, getDoctorBookings)
router.get('/:id/reviews', getDoctorReviews)
router.post('/:id/review', patientAuthMiddleware, postDoctorReviews)
router.post('/:id/bookings', patientAuthMiddleware, createPatientBookings)

export = router