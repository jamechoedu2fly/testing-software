import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout/Layout";
import "./AptitudeTable.css";

const CreatePreassessment = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editableRowId, setEditableRowId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({});
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    option: ["", "", "", ""],// Assuming 4 options for a question
    point: 0,
      correctAnswer: "",
  });

  const categoryId = "6493f53da6affbd5b06da221";
  const subCategoryIds = [
    "64a79acd4c21950579a8f9ad",
    "64a79ae44c21950579a8f9af",
    "64a79afb4c21950579a8f9b1",
  ];

  const headings = [
    "Commerce",
    "Humanities",
    "Science",
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const subCategoryPreAssessmentId = subCategoryIds[currentPage - 1];
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/question/get-all-preAssessment-question/${categoryId}/${subCategoryPreAssessmentId}`
        );
        const data = await response.json();
        setQuestions(data.allquestion);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [currentPage, categoryId, subCategoryIds]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (question) => {
    setEditableRowId(question._id);
    setEditedQuestion({ ...question });
  };

  const handleSave = async (question) => {
    try {
      // Perform the API call to update the question on the backend
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/question/update-preassessment-question/${question._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            categoryId: question.categoryId,
            question: question.question,
            option: question.option,
            point: question.point,
            correctAnswer: question.correctAnswer,
          }),
        }
      );

      const data = await response.json();

      // Handle successful response from the server
      if (response.ok) {
        // Update the state with the updated question
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) => (q._id === question._id ? data.Updquestion : q))
        );
        setEditableRowId(null);
      } else {
        // Handle error response from the server
        console.error('Error updating question:', data.error);
      }
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };
  const handleAddQuestion = async () => {
    try {
      const subCategoryPreAssessmentId = subCategoryIds[currentPage - 1];
      const response = await fetch(`${process.env.REACT_APP_API}/api/question/create-preAssessment-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId,
          subCategoryPreAssessmentId,
          question: newQuestion.question,
          option: newQuestion.option,
          correctAnswer: newQuestion.correctAnswer,
          point:newQuestion.point
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add the new question to the state
        setQuestions([...questions, data.newQuestion]);
        // Reset the new question state for the next input
        setNewQuestion({
          question: "",
          option: ["", "", "", ""],
          point: 0,
        correctAnswer: "",
        });
      } else {
        // Handle error response from the server
        console.error('Error creating question:', data.error);
      }
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <Layout>
      <div className="create-aptitude-container">
        <h2 className="page-title">Preassessment Question Table</h2>
        <h3 className="sub-category-heading">{headings[currentPage - 1]}</h3>
        <table className="aptitude-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Point</th>
              <th>Correct Answer</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question._id}>
                <td>
                  {editableRowId === question._id ? (
                    <input
                      type="text"
                      value={editedQuestion.question}
                      onChange={(e) =>
                        setEditedQuestion({ ...editedQuestion, question: e.target.value })
                      }
                    />
                  ) : (
                    question.question
                  )}
                </td>
                <td>
                  {editableRowId === question._id ? (
                    <ul>
                      {editedQuestion.option.map((opt, index) => (
                        <li key={index}>
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) =>
                              setEditedQuestion((prevState) => {
                                const updatedOption = [...prevState.option];
                                updatedOption[index] = e.target.value;
                                return { ...prevState, option: updatedOption };
                              })
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul>
                      {question.option.map((opt, index) => (
                        <li key={index}>{opt}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td>
                  {editableRowId === question._id ? (
                    <input
                      type="number"
                      value={editedQuestion.point}
                      onChange={(e) =>
                        setEditedQuestion({ ...editedQuestion, point: e.target.value })
                      }
                    />
                  ) : (
                    question.point
                  )}
                </td>
                <td>
                  {editableRowId === question._id ? (
                    <input
                      type="text"
                      value={editedQuestion.correctAnswer}
                      onChange={(e) =>
                        setEditedQuestion({ ...editedQuestion, correctAnswer: e.target.value })
                      }
                    />
                  ) : (
                    question.correctAnswer
                  )}
                </td>
                <td>
                  {editableRowId === question._id ? (
                    <>
                      <button onClick={() => handleSave(editedQuestion)}>Save</button>
                      <button onClick={() => setEditableRowId(null)}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(question)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  value={newQuestion.question}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, question: e.target.value })
                  }
                />
              </td>
              <td>
                <ul>
                  {newQuestion.option.map((opt, index) => (
                    <li key={index}>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          setNewQuestion((prevState) => {
                            const updatedOption = [...prevState.option];
                            updatedOption[index] = e.target.value;
                            return { ...prevState, option: updatedOption };
                          })
                        }
                      />
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <input
                  type="number"
                  value={newQuestion.point}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, point: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newQuestion.correctAnswer}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })
                  }
                />
              </td>
              <td>
                <button onClick={handleAddQuestion}>Add Question</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <button
            disabled={currentPage === subCategoryIds.length}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePreassessment;
