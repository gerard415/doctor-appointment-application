import express from 'express'
const router = express.Router()

import {getDoctor, getAllDoctors, editDoctor, deleteDoctor, getDoctorBookings, getDoctorReviews} from '../controllers/doctor'
import doctorAuthMiddleware = require('../middleware/doctorAuthentication')
import { postDoctorReviews, createPatientBookings } from '../controllers/patient'
import patientAuthMiddleware from '../middleware/patientAuthentication'

router.get('/profile', getDoctor)
router.get('/', getAllDoctors)
router.patch('/profile', doctorAuthMiddleware, editDoctor)
router.delete('/profile', doctorAuthMiddleware, deleteDoctor)
router.get('/bookings', doctorAuthMiddleware, getDoctorBookings)
router.get('/reviews', getDoctorReviews)
router.post('/:id/review', patientAuthMiddleware, postDoctorReviews)
router.post('/:id/booking', patientAuthMiddleware, createPatientBookings)

export = router