import mongoose from "mongoose";

const preAsseessmentSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    question: {
        type: String,
        required: true,
    },
    activities: {
        type: [String],
        required: true,
    },
    interest: {
        type: [String],
        required: true,
    }
})

export default mongoose.model("PreAssQuestion", preAsseessmentSchema)