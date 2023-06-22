import { response } from 'express';
import categoryModel from '../models/categoryModel.js'

export const createCategoryController = async (req, res) => {
    // creating new category
    const { name } = req.body;
    if (!name) {
        return res.status(404).send({
            message: "Name is required for category creation"
        })
    }
    try {
        const category = await categoryModel({
            name
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

// updating category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params; // getting id from params(url)

        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        )
        res.status(200).send({
            success: true,
            message: "Category updated Successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating category"
        })
    }

}

// getting all categories
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List was successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting category",
        });
    }
}

// deleting a category
export const deleteCategoryController = async (req, res) => {
    try {

        const { id } = req.params
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.send(500).send({
            success: false,
            error,
            message: "Error in a deleting category",
        });
    }
}



