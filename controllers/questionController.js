import preAssessmentModel from "../models/preAssessmentModel.js";
import questionModel from "../models/questionModel.js";
import psychometricquestionModel from "../models/psychometricquestionModel.js";
import AptituteResult from "../models/AptituteResult.js";
import userModel from "../models/userModel.js";
import multiparty from "multiparty";
import fs from "fs";
import PreassessmentResult from "../models/PreassessmentResult.js";
import PsychomtericResult from "../models/PsychomtericResult.js";
// create a new question
// export const createQuestionController = async (req, res) => {
//     try {
//         const { categoryId, subCategoryId, question, option, point, correctAnswer } = req.body;
//         const newQuestion = new questionModel({
//             categoryId,
//             subCategoryId,
//             question,
//             option,
//             point,
//             correctAnswer
//         })
//         await newQuestion.save();
//         res.status(201).send({
//             success: true,
//             message: "Question created successfully",
//             newQuestion,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             error,
//             message: "Error in creating question !!!"
//         })
//     }
// }

export const createQuestionController = async (req, res) => {
    try {
      const form = new multiparty.Form();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            success: false,
            error: err,
            message: "Error in parsing form data!",
          });
          return;
        }
  
        const { categoryId, subCategoryId, question, options } = fields;
  
        const point = parseInt(fields.point[0]);
        const correctAnswer = fields.correctAnswer[0]
          .toString()
          .replace(/"/g, "");
  
        const [questionData] = question;
        const { question_type, content } = JSON.parse(questionData);
        const { question_image } = files;
  
        let questionContent = null;
        let questionImageContent = null;
  
        if (question_type === "image") {
          if (question_image) {
            // Move the uploaded image file to the server's storage location
            const questionImagePath = `uploads/${question_image[0].originalFilename}`;
            fs.renameSync(question_image[0].path, questionImagePath);
            questionImageContent = questionImagePath;
            console.log("on 48");
          }
          questionContent = content;
        } else if (question_type === "text") {
          questionContent = content;
        }
  
        const parsedOptions = JSON.parse(options);
  
        const modifiedOptions = parsedOptions.map((option) => {
          return option;
        });
  
        const updatedQuestion = {
          question_type,
          content: questionContent,
          // contains_image: question_type === "image",
          image: questionImageContent,
        };
  
        // Create the new question object
        const newQuestion = new questionModel({
          categoryId,
          subCategoryId,
          question: updatedQuestion,
          options: modifiedOptions,
          point,
          correctAnswer,
        });
  
        const createdQuestion = await newQuestion.save();
  
        res.status(201).send({
          success: true,
          message: "Question created successfully",
          createdQuestion,
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in creating question!",
      });
    }
  };



// Aptitude result post
export const postAptiResultController = async (req, res) => {
  try {
      const { score, user,categoryName,userID } = req.body;
      const aptiResult = new AptituteResult({
          score,
          user,
          categoryName,
          userID
      })
      await aptiResult.save();
      res.status(201).send({
          success: true,
          message: "Apti Result posted",
          aptiResult,
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          error,
          message: "Error in creating apti questions",
      });
  }
}
// AptituteResult get
export const getAptiResultController = async (req, res) => {
  try {
    const allResults = await AptituteResult.find().sort({ createdAt: -1 });

    const formattedResults = allResults.reduce((acc, result) => {
      if (!acc[result.userID]) {
        acc[result.userID] = {
          _id: result.userID,
          categoryNameandScore: {},
          user: result.user,
        };
      }

      for (let i = 0; i < result.categoryName.length; i++) {
        acc[result.userID].categoryNameandScore[result.categoryName[i]] =
          result.score[i];
      }

      return acc;
    }, {});

    const resultArray = Object.values(formattedResults);

    res.status(200).json({
      success: true,
      countTotal: resultArray.length,
      message: "Aptitude results retrieved successfully",
      allResults: resultArray,
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

  

  // preassessment result post
  export const postPreassessmentResultController = async (req, res) => {
    try {
        const { categoryName, score,userID, user } = req.body;
        const PreResult = new PreassessmentResult({
            categoryName,
            score,
            userID,
            user
        })
        await PreResult.save();
        res.status(201).send({
            success: true,
            message: "Pre Result posted",
            PreResult,
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


// pre-result get
    export const getPreResultController = async (req, res) => {
        try {
          const allResults = await PreassessmentResult.find().sort({ createdAt: -1 });
      
          const formattedResults = allResults.reduce((acc, result) => {
            if (!acc[result.userID]) {
              acc[result.userID] = {
                _id: result.userID,
                categoryNameandScore: {},
                user: result.user,
              };
            }
      
            for (let i = 0; i < result.categoryName.length; i++) {
              acc[result.userID].categoryNameandScore[result.categoryName[i]] =
                result.score[i];
            }
      
            return acc;
          }, {});
      
          const resultArray = Object.values(formattedResults);
      
          res.status(200).json({
            success: true,
            countTotal: resultArray.length,
            message: "Pre results retrieved successfully",
            allResults: resultArray,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            error,
            message: "Error in retrieving Pre results",
          });
        }
      };
      
        

  // psychometric result post
  export const postPsychoResultController = async (req, res) => {
    try {
      const { categoryNameandSCore, userID, user } = req.body;
      const PsychoResult = new PsychomtericResult({
        categoryNameandSCore: categoryNameandSCore.length > 0 ? categoryNameandSCore : [], // Set a default value if no questions were attempted
        userID,
        user,
      });
      await PsychoResult.save();
      res.status(201).send({
        success: true,
        message: "Psycho Result posted",
        PsychoResult,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in creating psycho questions",
      });
    }
  };
  



    export const getPsychoResultController = async (req, res) => {
      try {
        const allResults = await PsychomtericResult.find().sort({ createdAt: -1 });
    
        const formattedResults = allResults.reduce((acc, result) => {
          if (!acc[result.userID]) {
            acc[result.userID] = {
              _id: result.userID,
              categoryNameandScore: {},
              user: result.user,
            };
          }
    
          for (let i = 0; i < result.categoryNameandSCore.length; i++) {
            // Assuming the categoryNameandSCore field is a nested array of [categoryName, score]
            acc[result.userID].categoryNameandScore[result.categoryNameandSCore[i][0]] =
              result.categoryNameandSCore[i][1];
          }
    
          return acc;
        }, {});
    
        const resultArray = Object.values(formattedResults);
    
        res.status(200).json({
          success: true,
          countTotal: resultArray.length,
          message: "Psychometric results retrieved successfully",
          allResults: resultArray,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          error,
          message: "Error in retrieving Psychometric results",
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
        const { categoryId, question, options, point } = req.body;
        // validate 
        switch (true) {
            case !categoryId:
                return res.status(500).send({ error: "Category is required" })
            case !question:
                return res.status(500).send({ error: "Question is Required" })
            case !options:
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

export const updatePreassessmentQuestionController = async (req, res) => {
  try {
      const { categoryId, question, option, point, correctAnswer } = req.body;
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
          case !correctAnswer:
            return res.status(500).send({ error: "Correct answer is Required" })
      }
      const Updquestion = await preAssessmentModel.findByIdAndUpdate(
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
        const { categoryId, question, option } = req.body;
        // validate 
        switch (true) {
            case !categoryId:
                return res.status(500).send({ error: "Category is required" })
            case !question:
                return res.status(500).send({ error: "Question is Required" })
            case !option:
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



// get user list
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



// delete user list
export const deleteUserController = async (req, res) => {
  try {
      await userModel.findByIdAndDelete(req.params.USERid);
      res.status(200).send({
          success: true,
          message: "User Deleted successfully",
      })
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: "Error while deleting user",
          error,
      });
  }
}

export const deleteApti = async (req, res) => {
  try {
    const result = await PsychomtericResult.deleteMany({});
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