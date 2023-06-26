import raisecModelcategory from "../models/raisec/raisecModelcategory.js";

export const createRiasecCategoryController = async (req, res) => {
    const { name, list } = req.body;
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
    try {
        const category = await raisecModelcategory({
            name,
            list
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