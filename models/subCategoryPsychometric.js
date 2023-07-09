import mongoose from "mongoose";

const subCategoryPsychometricSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("subCategoryPsychometric", subCategoryPsychometricSchema);
