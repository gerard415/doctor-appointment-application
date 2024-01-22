import express from 'express'
import { isAppointmentAvailable } from '../controllers/booking'
const router = express.Router()

router.post('/:id', isAppointmentAvailable)

export = router