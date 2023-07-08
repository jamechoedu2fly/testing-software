import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("subCategory", subCategorySchema);
