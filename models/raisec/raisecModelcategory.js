import mongoose from 'mongoose';

const riasecCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    list:{
        type:[String],
        required: true
    }
})

export default mongoose.model('RiasecCategory', riasecCategorySchema);