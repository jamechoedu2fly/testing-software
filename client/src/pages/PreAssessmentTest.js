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
        categoryName: "Commerce"
      },
      {
        url: `${process.env.REACT_APP_API}/api/question/get-all-preAssessment-question/6493f53da6affbd5b06da221/64a79ae44c21950579a8f9af`,
        categoryName: "Humanities"
      },
      {
        url:  `${process.env.REACT_APP_API}/api/question/get-all-preAssessment-question/6493f53da6affbd5b06da221/64a79afb4c21950579a8f9b1`,
        categoryName: "Science"
      }
    ];
    const [categoryScores, setCategoryScores] = useState({});
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
      console.log({totalScore})
      if (res.data.success) {
        handleCalculateScores(); // Call handleCalculateScores after submitting the form
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
                    <h4>
                      {i + 1}. {q.question}
                    </h4>
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
                <button type="button" onClick={handleSubmit} class="btn btn-primary">Submit</button>

            </form>
            <h3 className="mt-3">Total Score: {totalScore}</h3>
          </div>

        </div>
      </div>


    </Layout>
  );
};

export default PreAssessmentTest;
