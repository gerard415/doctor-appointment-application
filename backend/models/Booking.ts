import mongoose, {ObjectId, Schema, model} from "mongoose"

type bookingType = {
    doctor: ObjectId,
    patient: ObjectId,
    ticketPrice: number,
    appointmentDate: Date,
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
    appointmentDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    isPaid: {
        type: Boolean,
        default: true,
    },
},{ timestamps: true })

export = model('Booking', BookingSchema)