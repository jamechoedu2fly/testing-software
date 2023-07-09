import raisecModelcategory from "../models/raisec/raisecModelcategory.js";

export const createRiasecCategoryController = async (req, res) => {
    const { name, list,subCategoryRaisceId } = req.body;
    if (!name) {
        return res.status(404).send({
            message: "Name is required for category creation"
        })
    }
    if (!list) {
        return res.status(404).send({
            message: "List is required for category creation"
        })
    }
    if (!subCategoryRaisceId) {
        return res.status(404).send({
            message: "Sub-category is required for category creation"
        })
    }
    try {
        const category = await raisecModelcategory({
            name,
            list,
            subCategoryRaisceId
        }).save();
        res.status(201).send({
            success: true,
            message: "Category created successfully",
            category
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating category"
        })
    }
}

export const getRiasecCategoryController = async (req, res) => {
    try {
      const allResults = await raisecModelcategory.find().sort({ createdAt: -1 }); 
      res.status(200).json({
        success: true,
        countTotal: allResults.length,
        message: "raisec category retrieved successfully",
        allResults,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Error in retrieving raisec category",
      });
    }
  };

  export const deleteRiasecCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await raisecModelcategory.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category",
        });
    }
}
