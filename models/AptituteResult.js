import mongoose from 'mongoose';

const aptitudeResultSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true,
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },


});

export default mongoose.model('Result', aptitudeResultSchema);