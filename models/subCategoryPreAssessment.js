import mongoose from "mongoose";

const subCategoryPreAssessmentSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("subCategoryPreAssessment", subCategoryPreAssessmentSchema);
