import mongoose from 'mongoose';

const PreassessmentResultSchema = new mongoose.Schema({
  categoryName:{
    type: [String],
    required: true,
  },
  score: {
    type: [String],
    required: true,
  },
  userID:{
    type: String,
    required: true
  },
  user: {
    type: String,
    ref: 'users',
    required: true,
  },

  });
  
  export default mongoose.model('PreAssessmentResult', PreassessmentResultSchema);