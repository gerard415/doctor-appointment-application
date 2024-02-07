import mongoose, {ObjectId, Schema, model} from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Review from "./Review"

type qualificationsType = {
    startingDate: string
    endingDate: string
    degree: string
    university: string
}

type experienceType = {
    startingDate: string
    endingDate: string
    position: string
    hospital: string
}

export type doctorType = {
    createJWT: () => void,
    comparePassword: (arg0: string) => boolean,
    name: string,
    email: string,
    password: string,
    phone: number,
    gender: string,
    photo: string,
    role: 'doctor',
    ticketPrice: number,
    specialization: string,
    qualifications: [qualificationsType],
    experiences: [experienceType],
    bio: string,
    about: string,
    reviews: [Object],
    averageRating: number,
    totalRatings: number,
    isApproved: string,
    appointments: [Object],
    _id: number
}

const DoctorSchema = new Schema<doctorType>({
    name: {
        type: String,
        required: [true, 'please provide a product name'],
        maxlength: 50,
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'please provide an email'], 
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique: true,
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: 8
    },
    phone: {
        type: Number,
        default: 0 
    },
    gender: {
        type: String,
        enum: ['', 'male', 'female'],
        default: ''
    },
    photo: {
        type: String,
        default: ''
    },
    role: {
        type: String,
    },
    ticketPrice: {
        type: Number,
        default: 70,
        required: true
    },
    specialization: {
        type: String,
    },
    qualifications: {
        type: [Object],
        default: []
    },
    experiences: {
        type: [Object],
        default: []
    },
    bio: {
        type: String,
        minlength: 5,
    },
    about: {
        type: String,
        minlength: 4
    },
    reviews: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "Review",
        required: true,
        default: []
    }],
    averageRating: {
        type: Number,
        max: 5,
        min: 0,
        default: 0
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    isApproved: {
        type: String,
        enum: ["pending", "approved", "unapproved"],
        default: "unapproved"
    },
    appointments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Booking',
        required: true
    }]
    
})

// hashing the password using mongoose middleware
DoctorSchema.pre('save', async function(next){
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt) 
})


//creating the token using mongoose instance mathods
DoctorSchema.methods.createJWT = function(){
    return jwt.sign({name: this.name, doctorId: this._id}, process.env.DOCTOR_SECRET!, {expiresIn: '30d'} )
}

//comparing passwords 
DoctorSchema.methods.comparePassword = async function(candidatePassword:string){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default model('Doctor', DoctorSchema)