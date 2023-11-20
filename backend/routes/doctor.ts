import express from 'express'
const router = express.Router()

import {getDoctor, getAllDoctors, editDoctor, deleteDoctor, getDoctorBookings, getDoctorReviews} from '../controllers/doctor'

router.get('/profile', getDoctor)
router.get('/', getAllDoctors)
router.patch('/profile', editDoctor)
router.delete('/profile', deleteDoctor)
router.get('/bookings', getDoctorBookings)
router.get('/reviews', getDoctorReviews)

export = router