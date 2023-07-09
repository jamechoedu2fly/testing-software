import mongoose from 'mongoose';

const riasecCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    subCategoryRaisceId: {
        type: mongoose.Schema.ObjectId,
        ref: "subCategoryPreAssessment",
        required: true,
    },
    list:{
        type:[String],
        required: true
    }
})

export default mongoose.model('RiasecCategory', riasecCategorySchema);