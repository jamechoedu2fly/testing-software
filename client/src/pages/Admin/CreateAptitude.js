import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout/Layout";
import "./AptitudeTable.css";

const CreateAptitude = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedRowId, setEditedRowId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({});

  const categoryId = "648c7c9c9aee6736740e6a12";
  const subCategoryIds = [
    "64a51d902272419d09e20d3a",
    "64a51d6c2272419d09e20d38",
    "64a51d412272419d09e20d36",
  ];

  const headings = [
    "Arithmetic",
    "Verbal and Non-verbal",
    "Language and Communication",
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const subCategoryId = subCategoryIds[currentPage - 1];
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/question/get-all-question/${categoryId}/${subCategoryId}`
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
  const handleEditClick = (rowId) => {
    setEditedRowId(rowId);
    setEditedQuestion({});
  };

  const handleSaveClick = async (rowId) => {
    try {

      const updatedQuestion = {
        ...editedQuestion,
        categoryId: categoryId,
        options: editedQuestion.options || questions.find(q => q._id === rowId).options,
        point: editedQuestion.point || questions.find(q => q._id === rowId).point,
        question: {
          ...questions.find(q => q._id === rowId).question,
          content: editedQuestion.content || questions.find(q => q._id === rowId).question.content,
        },
      };
      // Make an API call to update the question
      const response = await fetch(`${process.env.REACT_APP_API}/api/question/update-question/${rowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuestion), // Send the edited question data in the request body
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      // Update the local state with the edited question data
      setQuestions((prevQuestions) => {
        return prevQuestions.map((question) => {
          if (question._id === rowId) {
            return { ...question, ...editedQuestion };
          }
          return question;
        });
      });
  
      // Clear the edited row ID after successful update
      setEditedRowId(null);
    } catch (error) {
      console.error("Error updating question:", error);
      // Handle error if necessary
    }
  };
  

  const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === "options") {
    // Split the options by newline and remove any empty options
    const optionsArray = value.split("\n").filter(option => option.trim() !== "");
    setEditedQuestion((prevEditedQuestion) => ({
      ...prevEditedQuestion,
      [name]: optionsArray,
    }));
  } else {
    setEditedQuestion((prevEditedQuestion) => ({
      ...prevEditedQuestion,
      [name]: value,
    }));
  }
};


  return (
    <Layout>
      <div className="create-aptitude-container">
        <h2 className="page-title">Aptitude Question Table</h2>
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
                  {editedRowId === question._id ? (
                    <input
                      type="text"
                      name="content"
                      value={editedQuestion.content || question.question.content}
                      onChange={handleInputChange}
                    />
                  ) : (
                    question.question.content
                  )}
                </td>
                {/* <td>{question.options.join(", ")}</td> */}
                <td>
                  {editedRowId === question._id ? (
                    <textarea
                      name="options"
                      value={editedQuestion.options || question.options}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <ul>
                      {question.options.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  )}
                </td>

                <td>
                  {editedRowId === question._id ? (
                    <input
                      type="number"
                      name="point"
                      value={editedQuestion.point || question.point}
                      onChange={handleInputChange}
                    />
                  ) : (
                    question.point
                  )}
                </td>
                <td>
                  {editedRowId === question._id ? (
                    <input
                      type="text"
                      name="correctAnswer"
                      value={editedQuestion.correctAnswer || question.correctAnswer}
                      onChange={handleInputChange}
                    />
                  ) : (
                    question.correctAnswer
                  )}
                </td>
                <td>
                  {editedRowId === question._id ? (
                    <button onClick={() => handleSaveClick(question._id)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(question._id)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
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

export default CreateAptitude;
