import express from 'express';
import {
    categoryController,
    createCategoryController,
    createPsychometricCategoryController,
    deleteCategoryController,
    updateCategoryController
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

// creating category route
router.post('/create-psychometric-category', createPsychometricCategoryController);

export default router;