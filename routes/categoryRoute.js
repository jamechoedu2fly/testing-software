import express from 'express';
import {
    categoryController,
    createCategoryController,
    deleteCategoryController,
    updateCategoryController,
    createSubCategoryController,
    categorySubController,
    deleteSubCategoryController,
    createsubcategoryPreAssessmentController,
    subcategoryPreAssessmentController,
    subcategoryPsychometricController,
    createsubcategoryPsychometricController,
    deletesubcategoryPsychometricController

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


// Psychometric sub category route
//create subcategory
router.post("/create-subcategoryPsychometric", createsubcategoryPsychometricController);

//get subcategory
router.get("/get-all-subcategoryPsychometric", subcategoryPsychometricController);

// delete category
router.delete("/delete-psychometric-category/:id", deletesubcategoryPsychometricController);

/*````````````````````*/
//RAISEC MODEL

// delete category

export default router;