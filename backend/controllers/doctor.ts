import {Request, Response} from 'express'
import Doctor, {doctorType} from '../models/Doctor';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request';
import UnauthenticatedError from '../errors/unauthenticated';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import Review, { reviewType } from '../models/Review';
import Booking from '../models/Booking';
import Patient, { patientType } from '../models/Patient';

const SECRET: Secret = process.env.DOCTOR_SECRET!

type MyToken = {
    doctorId: number
}

interface MyUserRequest extends Request {
    user?: any;
}

const getDoctor = async (req: Request, res: Response) => {
    const {id: doctorId} = req.params

    const {name, email, phone, ticketPrice, specialization, qualifications, experiences, bio, about, averageRating, totalRatings, _id:id} = await Doctor.findById(doctorId) as doctorType
    res.status(StatusCodes.OK).json({name, email, phone, ticketPrice, specialization, qualifications, experiences, bio, about, averageRating, totalRatings, _id:id})
}

const getDoctorProfile = async (req: Request, res: Response) => {
    const {token} = req.cookies

    if(token) {
        const {doctorId} = jwt.verify(token, SECRET) as MyToken
        const {name, email, phone, ticketPrice, specialization, qualifications, experiences, bio, about, averageRating, totalRatings, _id:id, appointments} = await Doctor.findById(doctorId) as doctorType
        res.status(StatusCodes.OK).json({name, email, phone, ticketPrice, specialization, qualifications, experiences, bio, about, averageRating, totalRatings, appointments, _id:id})
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

const getDoctorBookings = async (req: MyUserRequest, res: Response) => {
    const {doctorId} = req.user
    const appointments = await Booking.find({doctor:doctorId})
    res.status(StatusCodes.OK).json({appointments})
}

const getDoctorReviews = async (req: Request, res: Response) => {
    const {id: doctorId} = req.params
    const doctorReviews = await Review.find({doctor: doctorId}) as reviewType[]

    if(doctorReviews.length > 0){
        res.json(await Promise.all(
            doctorReviews.map(async ({patient, patientName, patientPhoto, text, rating, createdAt, _id}) => {
                const user = await Patient.findById(patient) as unknown as patientType
                return {patientName, patientPhoto: user.photo, text, rating, createdAt, _id}
            })
        ))
    }else {
        res.json([])
    }
    
}


export {getDoctor, getDoctorProfile, getAllDoctors, editDoctor, deleteDoctor, getDoctorBookings, getDoctorReviews}