import mongoose from 'mongoose';

const aptitudeResultSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true,
    }
})

export default mongoose.model('Result', aptitudeResultSchema);