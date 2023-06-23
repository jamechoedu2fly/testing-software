import express from 'express';
import {
    categoryController,
    createCategoryController,
    createPsychometricCategoryController,
    deleteCategoryController,
    deletePsychometricCategoryController,
    psychometricCategoryController,
    updateCategoryController,
    updatePsyschometricCategoryController
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