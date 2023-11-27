import mongoose, {ObjectId, Schema, model} from "mongoose"

export type reviewType = {
    doctor: ObjectId,
    patient: ObjectId,
    text: string,
    rating: number,
    createdAt: Date
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
},{ timestamps: true });

export default model('Review', ReviewSchema)