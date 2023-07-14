import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
        required: true,
    },
    question: {
        type: {
            question_type: String,
            content: String,
            contains_image: Boolean,
            image: String
        },
        required: true
    },
    options: {
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
});

export default mongoose.model("Question", questionSchema)