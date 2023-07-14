import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
const PreAssessmentTest = () => {
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [question, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
    const [auth, setAuth] = useAuth();
    const urls = [
      {
        url: `${process.env.REACT_APP_API}/api/question/get-all-preAssessment-question/6493f53da6affbd5b06da221/64a79acd4c21950579a8f9ad` ,
        categoryName: "commerce"
      },
      {
        url: `${process.env.REACT_APP_API}/api/question/get-all-preAssessment-question/6493f53da6affbd5b06da221/64a79ae44c21950579a8f9af`,
        categoryName: "humanities"
      },
      {
        url:  `${process.env.REACT_APP_API}/api/question/get-all-preAssessment-question/6493f53da6affbd5b06da221/64a79afb4c21950579a8f9b1`,
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
  
  
  return (
    <Layout>
      <div className="container p-4">
        <div class="card">
          <div class="card-header ">
            <h1 class="text-center">Pre-Assessment Test</h1>
          </div>
          <div class="card-body">
            <form >
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
                        <label
                          className="form-check-label"
                          htmlFor={p}
                        >
                          {p}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
                <button type="button" onClick={handleCalculateScores} class="btn btn-primary">Submit</button>

            </form>
            <h3 className="mt-3">Total Score: {totalScore}</h3>
          </div>

        </div>
      </div>


    </Layout>
  );
};

export default PreAssessmentTest;