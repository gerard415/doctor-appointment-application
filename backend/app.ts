import express, {Application, Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()


const app:Application = express()

import connectDB from './db/connect'

import authMiddleware from './middleware/authentication'

//routers
import authRouter from './routes/auth'

//error handlers
import notFound from './middleware/not-found'
import errorHandlerMiddleware from './middleware/errorHandler'

//middleware
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser())
// app.use('/uploads', express.static('C:/Users/gerar/Programming/typescript/inventory manageement application/inventory-management-application/backend' + '/uploads'))
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/auth', authRouter)

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