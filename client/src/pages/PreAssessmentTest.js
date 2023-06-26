import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PreAssessmentTest = () => {
  const [question, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    getAllPreAssessmentQuestion();
  }, []);

  const getAllPreAssessmentQuestion = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/question/get-all-preAssessment-question/6493f53da6affbd5b06da221`
      )
      setQuestions(data?.allquestion);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAnswerSelection = (questionId, selectedOption) => {
    const selectedQuestion = question.find((question) => question._id === questionId);
    if (selectedQuestion) {
      const optionIndex = selectedQuestion.activities.indexOf(selectedOption);
      setTotalScore((prevScore) => prevScore + optionIndex);
    }
  };

  return (
    <Layout>
      <div className="container p-4">
        <div class="card">
          <div class="card-header ">
            <h1 class="text-center">Pre-AssessmentTest Test</h1>
          </div>
          <div class="card-body">
            <form >
              {question?.map((q,i) => (
                <div className="card mb-4" key={q._id}>
                  <div className="card-body">
                  <h4>{i + 1}. {q.question}</h4>
                    <p className='p-2 ' style={{ color: 'red' }}>Mark only one Option</p>
                    {q.activities?.map((activity, index) => (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`activity_${q._id}`}
                          id={`activity_${q._id}_${index}`}
                          value={activity}
                        onChange={() => handleAnswerSelection(q._id, activity)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`activity_${q._id}_${index}`}
                        >
                          {activity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <Link to="psychometric-test">
                <button type="submit" className="btn btn-primary">Submit</button>
              </Link>

            </form>
            <h3 className="mt-3">Total Score: {totalScore}</h3>
          </div>

        </div>
      </div>


    </Layout>
  );
};

export default PreAssessmentTest;
