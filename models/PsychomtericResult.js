import mongoose from 'mongoose';

const PsychometricResultSchema = new mongoose.Schema({
  categoryNameandSCore:{
    type: [[String]],
    required: false,
  },
  userID:{
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    ref: 'users',
    required: true,
  },
  
  });
  
  export default mongoose.model('PsychometricResult', PsychometricResultSchema);