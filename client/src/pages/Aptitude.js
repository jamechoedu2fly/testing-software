import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
const Aptitude = () => {
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [question, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllQuestion = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/question/get-all-question/648c7c9c9aee6736740e6a12`
        );
        setQuestions(data?.allquestion);
        setQuestionsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    getAllQuestion();
  }, []);
  

  const handleAnswerSelection = (qId, selectedOption) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [qId]: selectedOption,
    }));
  };

  const calculateTotalScore = () => {
    let point = 0;
    question.forEach((q) => {
      const selectedAnswer = selectedAnswers[q._id];
      if (selectedAnswer === q.correctAnswer) {
        point += q.point;
      }
    });
    console.log(point)
    setTotalScore(point);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // calculateTotalScore();
    const totalScore = 6
    console.log("hello")
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/question/post-apti-score`, {
        totalScore
      });
      if (res.data.success) {
          console.log("sucess")
      }
      else {
          console.log("hellojs")
      }
  } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
  }
  };

  return (
    <Layout>
      <div class="container p-4">
        <div class="card">
          <div class="card-header ">
            <h1 class="text-center">Aptitude Test</h1>
          </div>
          {questionsLoaded ? (
            <div class="card-body">
              <form onSubmit={handleSubmit}>
                {question?.map((q, i) => (
                  <div class="card mb-4" key={q._id}>
                    <div class="card-body card-real">
                      <h4>
                        {i + 1}. {q.question}
                      </h4>
                      {q.option?.map((p) => (
                        <div class="form-check" key={p}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={q._id}
                            value={p}
                            id={p}
                            onChange={(e) =>
                              handleAnswerSelection(q._id, e.target.value)
                            }
                          />
                          <label class="form-check-label" htmlFor={p}>
                            {p}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
              <br/>
              <Link to={`/result?score=${totalScore}`} className="btn btn-primary">
            See Result
          </Link>
            </div>
          ) : (
            <div class="card-body">Loading questions...</div>
          )}
          <div class="card-footer bg-light">
            <h3 class="text-center">Total Score: {totalScore}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Aptitude;
