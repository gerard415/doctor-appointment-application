import {Request, Response} from 'express'
import Patient, { patientType } from '../models/Patient';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request';
import UnauthenticatedError from '../errors/unauthenticated';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface MyUserRequest extends Request {
    user?: any;
}

const SECRET: Secret = process.env.PATIENT_SECRET!

type MyToken = {
    patientId: number
}

const getPatient = async (req: MyUserRequest, res: Response) => {
    const {token} = req.cookies

    if(token) {
        const {patientId} = jwt.verify(token, SECRET) as MyToken
        const {name, email, phone, role, appointments, _id:id} = await Patient.findById(patientId) as patientType
        res.status(StatusCodes.OK).json({name, email, phone, role, appointments, _id:id})
    }else{
        res.json(null)
    }
}

const editPatient = async (req: Request, res: Response) => {
    const {token} = req.cookies
    const {name, password} = req.body

    if(name === '' || password === ''){
        throw new BadRequestError('Field cannot be empty')
    }

    if(token){
        const {patientId} = jwt.verify(token, SECRET) as MyToken
        const user = await Patient.findOneAndUpdate({_id: patientId}, {...req.body}, {new:true, runValidators:true})
        user?.save()
        const {name, email, phone, role, appointments, _id:id} = user as patientType
        res.status(StatusCodes.OK).json({name, email, phone, role, appointments, _id:id})
    }
}

const deletePatient = async (req: Request, res: Response) => {
    const {token} = req.cookies
    if(token){
        const {patientId} = jwt.verify(token, SECRET) as MyToken
        await Patient.findByIdAndDelete(patientId)
        res.status(StatusCodes.OK).json('user successfully deleted')
    }
}

const getPatientBookings = async (req: Request, res: Response) => {
    res.send('get patients bookings')
}

const postDoctorReviews = async (req: Request, res: Response) => {
    res.send('post doctor reviews')
}

export {getPatient, editPatient, deletePatient, getPatientBookings, postDoctorReviews}