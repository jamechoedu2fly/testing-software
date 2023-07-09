import express from 'express';
import { createRiasecCategoryController, getRiasecCategoryController, deleteRiasecCategoryController } from '../controllers/riasecCategoryController.js';

const router = express.Router();

//create category
router.post("/create-riasec-category", createRiasecCategoryController);

router.get("/get-riasec-category", getRiasecCategoryController);

router.delete("/delete-riasec-category/:id", deleteRiasecCategoryController);
export default router;