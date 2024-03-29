import express, {Application, Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()


const app:Application = express()

import connectDB from './db/connect'

//routers
import authRouter from './routes/auth'
import patientRouter from './routes/patient'
import doctorRouter from './routes/doctor'
import bookingRouter from './routes/booking'
import stripeRouter from './routes/stripe'

//error handlers
import notFound from './middleware/not-found'
import errorHandlerMiddleware from './middleware/errorHandler'
import doctorAuthMiddleware from './middleware/doctorAuthentication'
import patientAuthMiddleware from './middleware/patientAuthentication'

//middleware
app.use(cors({credentials: true, origin: 'https://healhub-ug2z.onrender.com'}));
app.use('/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/auth', authRouter)
app.use('/patient', patientAuthMiddleware, patientRouter)
app.use('/doctor', doctorRouter)
app.use('/booking', bookingRouter)
app.use('/stripe', stripeRouter)

//errors
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(process.env.PORT, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();