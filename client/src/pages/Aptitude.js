import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import "../styles/psychoStyles.css";
import CircularLoader from "./CircularLoader";
const Aptitude = () => {
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [question, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [auth, setAuth] = useAuth();
  const [timer, setTimer] = useState(30 * 60);
  const urls = [
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-question/648c7c9c9aee6736740e6a12/64a51d412272419d09e20d36`,
      categoryName: "Language and Communication"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-question/648c7c9c9aee6736740e6a12/64a51d6c2272419d09e20d38`,
      categoryName: "Verbal and Non-verbal"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-question/648c7c9c9aee6736740e6a12/64a51d902272419d09e20d3a`,
      categoryName: "Arithmatic"
    }
  ];

  const navigate = useNavigate();
  const [categoryScores, setCategoryScores] = useState({});

  const getAllQuestion = async () => {
    try {
      const allQuestions = [];

      for (const { url } of urls) {
        const { data } = await axios.get(url);
        allQuestions.push(...data?.allquestion);
      }

      setQuestions(allQuestions);
      setQuestionsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuestion();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
    }
  }, [timer]);

  const handleAnswerSelection = (qId, selectedOption) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [qId]: selectedOption
    }));
  };

  const calculateTotalScore = () => {
    let totalScore = 0;
    const categoryData = {}; // New object to store category-wise score

    question.forEach((q) => {
      const selectedAnswer = selectedAnswers[q._id];
      if (selectedAnswer === q.correctAnswer) {
        totalScore += q.point;
        // Increment category-wise score for the corresponding category ID
        categoryData[q.categoryId] = (categoryData[q.categoryId] || 0) + q.point;
      }
    });
    setTotalScore(totalScore); // Update the totalScore state for later use
    return totalScore;
  };

  const handleSubmit = async () => {
    let totalScore = calculateTotalScore();
    const userId = auth?.user._id;
    console.log("total_score::", totalScore);
    console.log("user_id:", userId);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/question/post-apti-score`, {
        totalScore,
        userId
      });
      if (res.data.success) {
        handleCalculateScores(); // Call handleCalculateScores after submitting the form
        navigate('/test');
        console.log("success");
      } else {
        console.log("hellojs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleCalculateScores = async () => {
    const categoryScores = {};

    for (const { url, categoryName } of urls) {
      try {
        const { data } = await axios.get(url);
        const questions = data?.allquestion || [];
        let score = 0;

        questions.forEach((q) => {
          const selectedAnswer = selectedAnswers[q._id];
          if (selectedAnswer === q.correctAnswer) {
            score += q.point;
          }
        });

        categoryScores[categoryName] = score;
        console.log(`Score for ${categoryName}:`, score);
      } catch (error) {
        console.log(`Error fetching data from ${url}:`, error);
      }
    }

    setCategoryScores(categoryScores);
    localStorage.setItem('categoryScores', JSON.stringify(categoryScores));
    navigate('/preassessment');
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="apti-page">
        <div className="container p-4">
          <div className="card-header">
            <h1 className="text-center">Aptitude Test</h1>
          </div>
          {questionsLoaded ? (
            <div className="card-body">
              <div className="timer">Time Remaining: {formatTime(timer)}</div>
              <form>
                {question?.map((q, i) => (
                  <div className="card mb-4" key={q._id}>
                    <div className="card-body card-real">
                      {q.question && q.question.image != null ? (
                        <img
                          src={`${process.env.REACT_APP_API}/${q.question.image}`}
                          alt={`Question ${i + 1}`}
                          className="question-image"
                        />
                      ) : (
                        <h6>
                          {i + 1}. {q.question && q.question.content}
                        </h6>
                      )}
                      {q.options?.map((p) => (
                        <div className="form-check" key={p}>
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
                          <label className="form-check-label" htmlFor={p}>
                            {p}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
              <br />
            </div>
          ) : (
            <CircularLoader />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Aptitude;
