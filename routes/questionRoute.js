import express from 'express';
import {
    createQuestionController,
    deleteQuestionController,
    getAllQuestionController,
    getAllpreAssessmentQuestionsController,
    preAssessmenQuestionController,
    updateQuestionController
}
    from '../controllers/questionController.js';

const router = express.Router();

// creating questions routes'
router.post("/create-question", createQuestionController);

// update questions 
router.put("/update-question/:qid", updateQuestionController);

// delete questions
router.delete("/delete-question/:qid", deleteQuestionController);

// get all questions
router.get("/get-all-question/:categoryId", getAllQuestionController);


// preAssessmen-Question
// create  question
router.post('/create-preAssessment-question', preAssessmenQuestionController);

// get all preAssessment questions
router.get("/get-all-preAssessment-question/:categoryId", getAllpreAssessmentQuestionsController);


export default router;