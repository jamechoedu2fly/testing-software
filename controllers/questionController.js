import questionModel from "../models/questionModel.js";

// create a new question
export const createQuestionController = async (req, res) => {
    try {
        const { categoryId, question, option, point } = req.body;
        const newQuestion = new questionModel({
            categoryId,
            question,
            option,
            point,
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
        const allquestion = await questionModel
            .find({})
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