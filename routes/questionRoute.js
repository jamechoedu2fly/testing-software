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
    updateQuestionController,
    showResultController,
    getResultController,
    getUserList,
    deleteApti,
    deletepreAssessmentQuestionsController
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
router.get("/get-all-question/:categoryId/:subCategoryId", getAllQuestionController);

//post all score
router.post("/post-apti-score",showResultController);

//get all api
router.get('/get-apti-score',getResultController)
router.delete("/delete-apti-data", deleteApti);
router.get('/get-user',getUserList);

// preAssessmen-Question
// create  question
router.post('/create-preAssessment-question', preAssessmenQuestionController);

// get all preAssessment questions
router.get("/get-all-preAssessment-question/:categoryId/:subCategoryPreAssessmentId", getAllpreAssessmentQuestionsController);

// delete pre assessment questions
router.delete("/delete-preAssessment-question/:qid", deletepreAssessmentQuestionsController);




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