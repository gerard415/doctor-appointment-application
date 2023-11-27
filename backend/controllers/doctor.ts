import {Request, Response} from 'express'
import Doctor, {doctorType} from '../models/Doctor';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request';
import UnauthenticatedError from '../errors/unauthenticated';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const SECRET: Secret = process.env.DOCTOR_SECRET!

type MyToken = {
    doctorId: number
}

const getDoctor = async (req: Request, res: Response) => {
    const {token} = req.cookies

    if(token) {
        const {doctorId} = jwt.verify(token, SECRET) as MyToken
        const {name, email, phone, role, appointments,reviews, _id:id} = await Doctor.findById(doctorId) as doctorType
        res.status(StatusCodes.OK).json({name, email, phone, role, appointments, reviews, _id:id})
    }else{
        res.json(null)
    }
}

const getAllDoctors = async (req: Request, res: Response) => {
    const doctors:doctorType[] = await Doctor.find().sort()
    res.status(StatusCodes.OK).json({doctors, count: doctors.length})
}

const editDoctor = async (req: Request, res: Response) => {
    const {token} = req.cookies
    const {name, password} = req.body

    if(name === '' || password === ''){
        throw new BadRequestError('Field cannot be empty')
    }

    if(token){
        const {doctorId} = jwt.verify(token, SECRET) as MyToken
        const user = await Doctor.findOneAndUpdate({_id: doctorId}, {...req.body}, {new:true, runValidators:true})
        user?.save()
        const {name, email, phone, role, appointments, _id:id} = user as doctorType
        res.status(StatusCodes.OK).json({name, email, phone, role, appointments, _id:id})
    }
}

const deleteDoctor = async (req: Request, res: Response) => {
    const {token} = req.cookies
    if(token){
        const {doctorId} = jwt.verify(token, SECRET) as MyToken
        await Doctor.findByIdAndDelete(doctorId)
        res.status(StatusCodes.OK).json('user successfully deleted')
    }
}

const getDoctorBookings = async (req: Request, res: Response) => {
    res.send('get doctors bookings')
}

const getDoctorReviews = async (req: Request, res: Response) => {
    res.send('get doctor reviews')
}


export {getDoctor, getAllDoctors, editDoctor, deleteDoctor, getDoctorBookings, getDoctorReviews}