import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/psychoStyles.css"
const PreAssessmentTest = () => {
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [question, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [timer, setTimer] = useState(15 * 60); // 15 minutes in seconds
  const [auth, setAuth] = useAuth();
  const urls = [
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-preAssessment-question/6493f53da6affbd5b06da221/64a79acd4c21950579a8f9ad`,
      categoryName: "commerce"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-preAssessment-question/6493f53da6affbd5b06da221/64a79ae44c21950579a8f9af`,
      categoryName: "humanities"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-preAssessment-question/6493f53da6affbd5b06da221/64a79afb4c21950579a8f9b1`,
      categoryName: "science"
    }
  ];
  const [categoryScoresPre, setCategoryScoresPre] = useState({});
  const navigate = useNavigate();

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
      handleCalculateScores();
    }
  }, [timer]);

  const handleAnswerSelection = (qId, selectedOption) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [qId]: selectedOption,
    }));
  };

  const handleCalculateScores = async () => {
    let bestScore = 0;
    let bestCategory = "";

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

        if (score > bestScore) {
          bestScore = score;
          bestCategory = categoryName;
        }
        console.log(`Score for ${categoryName}:`, score);
      } catch (error) {
        console.log(`Error fetching data from ${url}:`, error);
      }
    }

    if (bestCategory !== "") {
      console.log(`Best score: ${bestScore} in ${bestCategory}`);
    }
    localStorage.setItem('categoryScoresPre', JSON.stringify(bestCategory));
    setCategoryScoresPre(categoryScoresPre);
    navigate('/preassessment/psychometric-test');
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="pre-page">
      <div className="container p-4">
          <div className="card-header">
            <h1 className="text-center">Pre-Assessment Test</h1>
          </div>
          <div className="card-body">
            <div className="timer">Time Remaining: {formatTime(timer)}</div>
            <form>
              {question?.map((q, i) => (
                <div className="card mb-4" key={q._id}>
                  <div className="card-body card-real">
                    <h6>
                      {i + 1}. {q.question}
                    </h6>
                    {q.option?.map((p) => (
                      <div className="form-check" key={p}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={q._id}
                          id={p}
                          value={p}
                          onChange={(e) => handleAnswerSelection(q._id, e.target.value)}
                        />
                        <label className="form-check-label" htmlFor={p}>
                          {p}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button type="button" onClick={handleCalculateScores} className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        </div>
    </Layout>
  );
};

export default PreAssessmentTest;
