import express from 'express';
import { createRiasecCategoryController } from '../controllers/riasecCategoryController.js';

const router = express.Router();

//create category
router.post("/create-riasec-category", createRiasecCategoryController);


export default router;