import mongoose, {Schema, model} from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export type patientType = {
    createJWT: () => void,
    comparePassword: (arg0: string) => boolean,
    name: string,
    email: string,
    password: string,
    phone: number,
    photo: string,
    role: 'patient',
    bloodtype: string,
    appointments: [Object]
    _id: number
}

const PatientSchema = new Schema<patientType>({
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
    photo: {
        type: String
    },
    role: {
        type: String,
    },
    bloodtype: {
        type: String,
        default: ''
    },
    appointments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Booking',
        required: true
    }]
})

//hashing the password using mongoose middleware
PatientSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt) 
})

//creating the token using mongoose instance mathods
PatientSchema.methods.createJWT = function(){
    return jwt.sign({name: this.name, patientId: this._id}, process.env.PATIENT_SECRET!, {expiresIn: '30d'} )
}

//comparing passwords 
PatientSchema.methods.comparePassword = async function(candidatePassword:string){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default model('Patient', PatientSchema)