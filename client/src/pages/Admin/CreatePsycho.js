import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout/Layout";
import "./AptitudeTable.css";

const CreatePsycho = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editableRowId, setEditableRowId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({});
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    option: ["", "", "", ""] // Assuming 4 options for a question
  });

  const categoryId = "64a938af3a0d5ef596eede01";
  const subCategoryIds = [
    "64a93abb04ceb32efe9ebbf2",
    "64a93adf04ceb32efe9ebbf6",
    "64a93ad004ceb32efe9ebbf4",
    "64a93ae904ceb32efe9ebbf8",
    "64a93af404ceb32efe9ebbfa",
    "64a93b0404ceb32efe9ebbfc",
  ];

  const headings = [
    "Realistic",
    "Investigative",
    "Artistic",
    "Social",
    "Enterprising",
    "Conventional"
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const subCategoryPsychometricId = subCategoryIds[currentPage - 1];
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/${categoryId}/${subCategoryPsychometricId}`
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
        `${process.env.REACT_APP_API}/api/question/update-psychometric-question/${question._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            categoryId: question.categoryId,
            question: question.question,
            option: question.option,
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
      const subCategoryPsychometricId = subCategoryIds[currentPage - 1];
      const response = await fetch(`${process.env.REACT_APP_API}/api/question/create-psychometric-Question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId,
          subCategoryPsychometricId,
          question: newQuestion.question,
          option: newQuestion.option,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add the new question to the state
        setQuestions([...questions, data.newQuestion]);
        // Reset the new question state for the next input
        setNewQuestion({
          question: "",
          option: ["", "", "", ""]
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
            {/* New row to add question */}
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

export default CreatePsycho;