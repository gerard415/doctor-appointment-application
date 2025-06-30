import {Request, Response} from 'express'
import Patient, { patientType } from '../models/Patient'
import Doctor, { doctorType } from '../models/Doctor'
import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/bad-request'
import UnauthenticatedError from '../errors/unauthenticated'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { fileSizeFormatter } from '../utils/multer'
import cloudinary from '../utils/cloudinary'
import streamifier from 'streamifier';


type Token = {
    patientId: number
    doctorId: number
}

const SECRET: Secret = process.env.PATIENT_SECRET!

const register  = async (req:Request, res:Response) => {
    const {name, email, password, role} = req.body

    if(!role){
        throw new BadRequestError('Select a role')
    }

    if(!name|| !email || !password){
        throw new BadRequestError('Fields cannot be empty')
    }

    if(role === 'patient'){
        const patient:patientType = await Patient.create({...req.body})

        const token = patient.createJWT()
        res.status(StatusCodes.CREATED).json({user: { name: patient.name, email: patient.email, role: patient.role}, token: token})
    }

    if(role === 'doctor'){
        const doctor:doctorType = await Doctor.create({...req.body})

        const token = doctor.createJWT()
        res.status(StatusCodes.CREATED).json({user: { name: doctor.name, email: doctor.email, role: doctor.role}, token: token})
    }
}

const login  = async (req:Request, res:Response) => {
    const {email, password, role} = req.body

    if(!email || !password){
        throw new BadRequestError('Please provide both email and password')
    }

    let user = null

    const patient = await Patient.findOne({email})
    const doctor = await Doctor.findOne({email})

    if(patient){
        user = patient
    }

    if(doctor){
        user = doctor
    }
    
    //finding the user with the particular email
    if(!user){
        throw new UnauthenticatedError('User does not exist')
    }

    //comparing passwords
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    }

    //creating the token
    const token = user.createJWT()
    
    if(user === patient){
        res.status(StatusCodes.OK).json({user: { name: user.name, email: user.email, role: user.role, id:user._id, phone: user.phone, bloodtype: patient?.bloodtype}, token: token})
    }

    if(user === doctor){
        res.status(StatusCodes.OK).json({user: { name: user.name, email: user.email, role: user.role, id:user._id, phone: user.phone}, token: token})
    }
    
}

const logout  = async (req:Request, res:Response) => {
    res.cookie('token', '').json('logged out')
}

const getUser  = async (req:Request, res:Response) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(token && token !== 'null') {
        const decoded = jwt.verify(token, SECRET) as Token

        if('patientId' in decoded){
            const {patientId} = decoded
            const {name, email, phone, bloodtype, role, _id:id, photo, gender} = await Patient.findById(patientId) as patientType
            res.status(StatusCodes.OK).json({name, email, phone, bloodtype, role, _id:id, photo, gender})
        }

        if('doctorId' in decoded){
            const {doctorId} = decoded
            const {name, email, phone,gender, ticketPrice, specialization, qualifications, experiences, bio, role, about, averageRating, totalRatings, _id:id, photo, isApproved} = await Doctor.findById(doctorId) as doctorType
            res.status(StatusCodes.OK).json({name, email, phone, gender, ticketPrice, specialization, qualifications, role, experiences, bio, about, averageRating, totalRatings, _id:id, photo, isApproved})
        }

    }else{
        throw new UnauthenticatedError('You are not signed in')
        res.json(null)
    }
}


const upload = async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ error: 'No file uploaded or buffer missing' });
  }

  try {
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'products',
            resource_type: 'image',
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file!.buffer).pipe(stream);
      });
    };

    const uploadedFile: any = await streamUpload();

    const fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
    };

    res.status(200).json(fileData);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Image could not be uploaded' });
  }
};


export {register, login, logout, getUser, upload}