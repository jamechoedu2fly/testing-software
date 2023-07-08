
import categoryModel from '../models/categoryModel.js'
import subCategoryModel from '../models/subCategory.js';
import subCategoryPreAssessmentModel from '../models/subCategoryPreAssessment.js';

// create category
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

// create aptitude subcategory
export const createSubCategoryController = async (req, res) => {
    // creating new category
    const { name } = req.body;
    if (!name) {
        return res.status(404).send({
            message: "Name is required for Sub-category creation"
        })
    }
    try {
        const Subcategory = await subCategoryModel({
            name
        }).save();
        res.status(201).send({
            success: true,
            message: "Sub-category created successfully",
            Subcategory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating Sub-category"
        })
    }
}

// get aptitude subcategory 
export const categorySubController = async (req, res) => {
    try {
        const Subcategory = await subCategoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Sub-categories List was successfully",
            Subcategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting Sub-category",
        });
    }
}
// deleting aptiude  subcategory
export const deleteSubCategoryController = async (req, res) => {
    try {

        const { id } = req.params
        await subCategoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Sub-category deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.send(500).send({
            success: false,
            error,
            message: "Error in a deleting Sub-category",
        });
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


/*``````````````````````````````````````*/

export const createPsychometricCategoryController = async (req, res) => {
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
            message: "Psychometric category created successfully",
            category
        })
    }
    catch (error) {
        console.log(error)
        res.send(500).send({
            success: false,
            error,
            message: "Error in a creating psychomatric category",
        });
    }
}


// get all psychomatric category

export const psychometricCategoryController = async (req, res) => {
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

// deleting psychomatric category

export const deletePsychometricCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id);
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

// updating a category controller in psychometric

export const updatePsyschometricCategoryController = async (req,res)=>{
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
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });
    }
}



// create pre-assessment subcategory
export const createsubcategoryPreAssessmentController = async (req, res) => {
    // creating new category
    const { name } = req.body;
    if (!name) {
        return res.status(404).send({
            message: "Name is required for Sub-category creation"
        })
    }
    try {
        const preAssessmentSubcategory = await subCategoryPreAssessmentModel({
            name
        }).save();
        res.status(201).send({
            success: true,
            message: "Pre-assessemnt Sub-category created successfully",
            preAssessmentSubcategory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating Pre-Assessment Sub-category"
        })
    }
}

// get pre-assessment sub category
export const subcategoryPreAssessmentController = async (req, res) => {
    try {
        const preAssessmentSubcategory = await subCategoryPreAssessmentModel.find({});
        res.status(200).send({
            success: true,
            message: "All Sub-categories List was successfully",
            preAssessmentSubcategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting Sub-category",
        });
    }
}