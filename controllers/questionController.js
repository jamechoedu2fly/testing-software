import preAssessmentModel from "../models/preAssessmentModel.js";
import questionModel from "../models/questionModel.js";
import psychometricquestionModel from "../models/psychometricquestionModel.js";
import AptituteResult from "../models/AptituteResult.js";
import userModel from "../models/userModel.js";
// create a new question
export const createQuestionController = async (req, res) => {
    try {
        const { categoryId, subCategoryId, question, option, point, correctAnswer } = req.body;
        const newQuestion = new questionModel({
            categoryId,
            subCategoryId,
            question,
            option,
            point,
            correctAnswer
        })
        await newQuestion.save();
        res.status(201).send({
            success: true,
            message: "Question created successfully",
            newQuestion,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating question !!!"
        })
    }
}

export const showResultController = async (req, res) => {
    try {
      const { totalScore, categoryScores, userId } = req.body;
      console.log("user_id::", userId);
      const score = totalScore;
      const user = userId;
      const showresult = new AptituteResult({
        score,
        categoryScores, // Store the subcategory-wise scores
        user,
      });
      await showresult.save();
      res.status(201).send({
        success: true,
        message: "Total found successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in creating total !!!",
      });
    }
  };
  

export const getResultController = async (req, res) => {
    try {
      const allResults = await AptituteResult.find().sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        countTotal: allResults.length,
        message: "Aptitude results retrieved successfully",
        allResults,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Error in retrieving aptitude results",
      });
    }
  };

// delete question

export const deleteQuestionController = async (req, res) => {
    try {
        await questionModel.findByIdAndDelete(req.params.qid);
        res.status(200).send({
            success: true,
            message: "Question Deleted successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting question",
            error,
        });
    }
}

// update question
export const updateQuestionController = async (req, res) => {
    try {
        const { categoryId, question, option, point } = req.body;
        // validate 
        switch (true) {
            case !categoryId:
                return res.status(500).send({ error: "Category is required" })
            case !question:
                return res.status(500).send({ error: "Question is Required" })
            case !option:
                return res.status(500).send({ error: "Option is Required" })
            case !point:
                return res.status(500).send({ error: "Point is Required" })
        }
        const Updquestion = await questionModel.findByIdAndUpdate(
            req.params.qid,
            { ...req.body },
            { new: true }
        )
        await Updquestion.save();
        res.status(201).send({
            success: true,
            message: "Question Updated Successfully",
            Updquestion
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Something went wrong in updating the question"
        })
    }
}

// getting all questions
export const getAllQuestionController = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        const allquestion = await questionModel
            .find({ subCategoryId })
            .sort({ createdAt: -1 })
        res.status(201).send({
            success: true,
            counTotal: allquestion.length,
            message: "Questions get successfully",
            allquestion,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting all questions",
        });
    }
}

// Pre Asssessment Models
// create Asssessment question
export const preAssessmenQuestionController = async (req, res) => {
    try {
        const { categoryId, subCategoryPreAssessmentId, question, option, point, correctAnswer } = req.body;
        const newQuestion = new preAssessmentModel({
            categoryId,
            subCategoryPreAssessmentId,
            question,
            option,
            point,
            correctAnswer
        })
        await newQuestion.save();
        res.status(201).send({
            success: true,
            message: "Question created in preAssesment category successfully",
            newQuestion,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating pre-Assessment questions",
        });
    }
}



// getting all preAssessment questions
export const getAllpreAssessmentQuestionsController = async (req, res) => {
    try {
        const { subCategoryPreAssessmentId } = req.params;
        const allquestion = await preAssessmentModel
            .find({ subCategoryPreAssessmentId })
            .sort({ createdAt: -1 })
        res.status(201).send({
            success: true,
            counTotal: allquestion.length,
            message: "Questions get successfully",
            allquestion,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting all questions",
        });
    }
}
// delete preassessment question
export const deletepreAssessmentQuestionsController = async (req, res) => {
    try {
        await preAssessmentModel.findByIdAndDelete(req.params.qid);
        res.status(200).send({
            success: true,
            message: "PreAssessment Question Deleted successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting question",
            error,
        });
    }
}

/*```````````````````````````````````````` */
// RAISEC MODEL
// create a new question in psychometric test
export const createPsychometricQuestionController = async (req, res) => {
    try {
        const { categoryId, subCategoryPsychometricId, question, option } = req.body;
        const newQuestion = new psychometricquestionModel({
            categoryId,
            subCategoryPsychometricId,
            question,
            option
        })
        await newQuestion.save();
        res.status(201).send({
            success: true,
            message: "Question created successfully",
            newQuestion,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating question !!!"
        })
    }
}

// get all psychometric Question

export const getAllPsychometricQuestionsController = async (req, res) => {
    try {
        const { subCategoryPsychometricId } = req.params;
        const allquestion = await psychometricquestionModel
            .find({ subCategoryPsychometricId })
            .sort({ createdAt: -1 })
        res.status(201).send({
            success: true,
            counTotal: allquestion.length,
            message: "Questions get successfully",
            allquestion,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting all questions",
        });
    }
}


// delete a psychomatric question 

export const deletePsychometricQuestionController = async (req, res) => {
    try {
        await psychometricquestionModel.findByIdAndDelete(req.params.qid);
        res.status(200).send({
            success: true,
            message: "Question Deleted successfully from psychomatric test",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in deleting a questions",
        });
    }
}

// updating a psychomatric question

export const updatePsychometricQuestionController = async (req, res) => {
    try {
        const { categoryId, question, option,subCategoryPsychometricId } = req.body;
        // validate 
        switch (true) {
            case !categoryId:
                return res.status(500).send({ error: "Category is required" })
            case !question:
                return res.status(500).send({ error: "Question is Required" })
            case !option:
                return res.status(500).send({ error: "Option is Required" })
            case !subCategoryPsychometricId:
                return res.status(500).send({ error: "Option is Required" })
        }
        const Updquestion = await psychometricquestionModel.findByIdAndUpdate(
            req.params.qid,
            { ...req.body },
            { new: true }
        )
        await Updquestion.save();
        
        res.status(201).send({
            success: true,
            message: "Question Updated Successfully",
            Updquestion
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Something went wrong in updating the question"
        })
    }
}


export const getUserList = async (req, res) => {
  try {
    const allResults = await userModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      countTotal: allResults.length,
      message: "User  retrieved successfully",
      allResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error in retrieving aptitude results",
    });
  }
};


export const deleteApti = async (req, res) => {
  try {
    const result = await AptituteResult.deleteMany({});
    console.log("deleteApti");
    res.status(200).send({
      success: true,
      message: "Question Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting question",
      error,
    });
  }
};