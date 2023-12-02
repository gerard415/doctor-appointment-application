import mongoose, {ObjectId, Schema, model} from "mongoose"

export type bookingType = {
    doctor: ObjectId,
    patient: ObjectId,
    ticketPrice: number,
    appointmentTime: number,
    appointmentDate: string,
    status: string
    isPaid: boolean
}

const BookingSchema = new Schema<bookingType>({
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    appointmentTime:{
        type: Number,
        enum: [8, 10, 12, 14, 16],
        required: true
    },
    appointmentDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "approved",
    },
    isPaid: {
        type: Boolean,
        default: true,
    },
},{ timestamps: true })

export default model('Booking', BookingSchema)