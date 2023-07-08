import express from 'express';
import {
    categoryController,
    createCategoryController,
    createPsychometricCategoryController,
    deleteCategoryController,
    deletePsychometricCategoryController,
    psychometricCategoryController,
    updateCategoryController,
    updatePsyschometricCategoryController,
    createSubCategoryController,
    categorySubController,
    deleteSubCategoryController,
    createsubcategoryPreAssessmentController,
    subcategoryPreAssessmentController,

}
    from './../controllers/categoryController.js';

const router = express.Router();

// routes
// creating category route
router.post('/create-category', createCategoryController);

// updating category
router.put("/update-category/:id", updateCategoryController);

//get all category
router.get('/get-category', categoryController);

// detete a  category
router.delete("/delete-category/:id", deleteCategoryController);


//create aptitude subcategory
router.post("/create-subcategory", createSubCategoryController);

//get aptitude subcategory
router.get("/get-all-subcategory", categorySubController);

// detete a  aptitude category
router.delete("/delete-subcategory/:id", deleteSubCategoryController);



// Pre Assessment sub category route
//create subcategory
router.post("/create-subcategoryPreAssessment", createsubcategoryPreAssessmentController);

//get subcategory
router.get("/get-all-subcategoryPreAssessment", subcategoryPreAssessmentController);



/*````````````````````*/
//RAISEC MODEL
// creating category route
router.post('/create-psychometric-category', createPsychometricCategoryController);

// get all category
router.get("/get-psychometric-category", psychometricCategoryController);

// delete category
router.delete("/delete-psychometric-category/:id", deletePsychometricCategoryController);

// update category
router.put("/update-psychometric-category/:id", updatePsyschometricCategoryController);

export default router;