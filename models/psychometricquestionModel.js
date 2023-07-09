import mongoose from "mongoose";

const psychometricQuestionSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategoryPsychometricId: {
        type: mongoose.Schema.ObjectId,
        ref: "subCategoryPsychometric",
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    option: {
        type: [String],
        required: true,
    }
})

export default mongoose.model("PsychometricQuestion", psychometricQuestionSchema)