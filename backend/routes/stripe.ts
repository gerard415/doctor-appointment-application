import express, { json } from 'express';
const router = express.Router()

import { checkOut, webhook } from '../controllers/stripe'
import patientAuthMiddleware from '../middleware/patientAuthentication'

router.post('/create-checkout-session/:id', patientAuthMiddleware, checkOut)
router.post('/webhook', express.raw({type: 'application/json'}), webhook)

export = router