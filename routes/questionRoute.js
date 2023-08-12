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
    getUserList,
    deleteApti,
    deletepreAssessmentQuestionsController,
    updatePreassessmentQuestionController,
    postAptiResultController,
    getAptiResultController,
    postPreassessmentResultController,
    getPreResultController,
    postPsychoResultController,
    getPsychoResultController,
    deleteUserController
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





//post apti score
router.post("/post-apti-score",postAptiResultController);

//get apti core
router.get('/get-apti-score',getAptiResultController);

//post pre score
router.post("/post-pre-score",postPreassessmentResultController);

//get pre score
router.get('/get-pre-score',getPreResultController);

//post psycho score
router.post("/post-psycho-score",postPsychoResultController);

//get psycho score
router.get('/get-psycho-score',getPsychoResultController);





router.delete("/delete-apti-data", deleteApti);
router.get('/get-user',getUserList);
router.delete('/detele-user/:USERid',deleteUserController);


// preAssessmen-Question
// create  question
router.post('/create-preAssessment-question', preAssessmenQuestionController);

// get all preAssessment questions
router.get("/get-all-preAssessment-question/:categoryId/:subCategoryPreAssessmentId", getAllpreAssessmentQuestionsController);

// delete pre assessment questions
router.delete("/delete-preAssessment-question/:qid", deletepreAssessmentQuestionsController);


router.put("/update-preassessment-question/:qid", updatePreassessmentQuestionController)

/*``````````````````````````````*/
// psychometric Question
// create a new quesion
router.post("/create-psychometric-Question", createPsychometricQuestionController)

// get all psychometric questions
router.get("/get-all-psychometric-question/:categoryId/:subCategoryPsychometricId", getAllPsychometricQuestionsController);

// delete a psychometric question
router.delete("/delete-psychometric-question/:qid", deletePsychometricQuestionController);

// update questions 
router.put("/update-psychometric-question/:qid", updatePsychometricQuestionController)

export default router;