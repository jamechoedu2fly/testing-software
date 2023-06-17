import express from 'express';
import {
    categoryController,
    createCategoryController,
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

export default router;