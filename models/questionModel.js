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
        type: String,
        required: true,
        unique: true,
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
});

export default mongoose.model("Question", questionSchema)