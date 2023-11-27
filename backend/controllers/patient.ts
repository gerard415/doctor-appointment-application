import {Request, Response} from 'express'
import Patient, { patientType } from '../models/Patient';
import Review, { reviewType } from '../models/Review';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request';
import UnauthenticatedError from '../errors/unauthenticated';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import Doctor, { doctorType } from '../models/Doctor';

interface MyUserRequest extends Request {
    user?: any;
}

const SECRET: Secret = process.env.PATIENT_SECRET!

type MyToken = {
    patientId: number
}

const getPatient = async (req: Request, res: Response) => {
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

const createPatientBookings = async (req: Request, res: Response) => {
    res.send('get patients bookings')
}

const postDoctorReviews = async (req: MyUserRequest, res: Response) => {
    const {id: doctorId} = req.params
    const {patientId} = req.user

    const {text, rating} = req.body

    if(!text || !rating){
        throw new BadRequestError('Field cannot be empty')
    }

    const doctorReview = await Review.create({doctor: doctorId, patient: patientId, ...req.body})
    const reviews = await Review.find({doctor: doctorId}) as reviewType[]
    const doc = await Doctor.findById( doctorId ) as doctorType

    const ratingsSum = reviews.reduce((accumulator, currentValue) => accumulator + currentValue.rating,0);

    const aveRating = ratingsSum/(doc.totalRatings + 1)
    
    const doctor = await Doctor.findByIdAndUpdate(doctorId,
        {
           $push: {
                reviews: doctorReview._id
           },
           $inc: {
                totalRatings: 1
           },
           $set: {
                averageRating: Math.round(aveRating)
           }
        },
    {new:true});
    doctor?.save()
    
    res.status(StatusCodes.CREATED).json({doctorReview})  
}

export {getPatient, editPatient, deletePatient, getPatientBookings, postDoctorReviews, createPatientBookings}