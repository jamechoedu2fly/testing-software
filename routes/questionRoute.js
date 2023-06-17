import express from 'express';
import { createQuestionController, deleteQuestionController, getAllQuestionController, updateQuestionController } from '../controllers/questionController.js';

const router = express.Router();

// creating questions routes'
router.post("/create-question", createQuestionController);

// update questions 
router.put("/update-question/:qid", updateQuestionController);

// delete questions
router.delete("/delete-question/:qid", deleteQuestionController);

// get all questions
router.get("/get-all-question", getAllQuestionController);

export default router;