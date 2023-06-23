import express from 'express';
import {
    createPsychometricQuestionController,
    createQuestionController,
    deletePsychometricQuestionController,
    deleteQuestionController,
    getAllPsychometricQuestionsController,
    getAllQuestionController,
    getAllpreAssessmentQuestionsController,
    preAssessmenQuestionController,
    updatePsychometricQuestionController,
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



/*``````````````````````````````*/
// psychometric Question
// create a new quesion
router.post("/create-psychometric-Question", createPsychometricQuestionController)

// get all psychometric questions
router.get("/get-all-psychometric-question/:categoryId", getAllPsychometricQuestionsController);
export default router;

// delete a psychometric question
router.delete("/delete-psychometric-question/:qid", deletePsychometricQuestionController);

// update questions 
router.put("/update-psychometric-question/:qid", updatePsychometricQuestionController)