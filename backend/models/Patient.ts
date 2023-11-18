import mongoose, {Schema, model} from "mongoose"

type patientType = {
    name: string,
    email: string,
    password: string,
    phone: number,
    photo: string,
    role: 'patient',
    gender: string,
    bloodtype: string,
    appointments: [Object]
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
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    bloodtype: {
        type: String
    },
    appointments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Booking'
    }]
})

export  =  model('Patient', PatientSchema)