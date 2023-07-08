import mongoose from "mongoose";

const preAsseessmentSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategoryPreAssessmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "subCategoryPreAssessment",
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    option: {
        type: [String],
        required: true,
    },
    point: {
        type: Number,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true
    }
})

export default mongoose.model("PreAssQuestion", preAsseessmentSchema)