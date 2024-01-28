import mongoose, {ObjectId, Schema, model} from "mongoose"

export type reviewType = {
    doctor: ObjectId,
    patient: ObjectId,
    patientName: string,
    patientPhoto: string,
    text: string,
    rating: number,
    _id: number
    createdAt: string
}

const ReviewSchema = new Schema<reviewType>({
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: "Doctor",
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    patientName: {
        type: String,
        required: [true, 'patient name must be present']
    },
    patientPhoto: {
        type: String,
    },
    text: {
        type: String,
        required: [true, 'please add a review text'],
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
    },
    createdAt: {
        type: String,
        required: [true, 'date must be present']
    }
},{ timestamps: true });

export default model('Review', ReviewSchema)