import mongoose, {ObjectId, Schema, model} from "mongoose"

type reviewType = {
    doctor: ObjectId,
    patient: ObjectId,
    reviewText: string,
    rating: Number
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
    reviewText: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
    },
},{ timestamps: true });

export = model('Review', ReviewSchema)