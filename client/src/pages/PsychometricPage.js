import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import "../styles/psychoStyles.css"

import CircularLoader from "./CircularLoader";
const PsychometricPage = () => {
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [question, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [timer, setTimer] = useState(30 * 60);
  const handleNewAttempt = () => {
    localStorage.removeItem('categoryScoresPsycho');
    localStorage.removeItem('topThreeScoresString');
    localStorage.removeItem('SixthScore');
    localStorage.removeItem('FifthScore');
    localStorage.removeItem('FourthScore');
    // Add code to clear other relevant data if needed
    // ...
  };

    const [auth, setAuth] = useAuth();
    const urls = [
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/64a938af3a0d5ef596eede01/64a93abb04ceb32efe9ebbf2`,
      categoryName: "R"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/64a938af3a0d5ef596eede01/64a93ad004ceb32efe9ebbf4`,
      categoryName: "A"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/64a938af3a0d5ef596eede01/64a93adf04ceb32efe9ebbf6`,
      categoryName: "I"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/64a938af3a0d5ef596eede01/64a93ae904ceb32efe9ebbf8`,
      categoryName: "S"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/64a938af3a0d5ef596eede01/64a93af404ceb32efe9ebbfa`,
      categoryName: "E"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/64a938af3a0d5ef596eede01/64a93b0404ceb32efe9ebbfc`,
      categoryName: "C"
    },
  ];
    const [categoryScoresPsycho, setCategoryScoresPsycho] = useState({});
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
    console.log(selectedOption);
  };
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

  
  const handleCalculateScores = async () => {
    handleNewAttempt();
     const attemptedQuestions = Object.keys(selectedAnswers).length;
     if (attemptedQuestions === 0) {
      await axios.post(`${process.env.REACT_APP_API}/api/question/post-psycho-score`, {
        categoryNameandSCore: [], // Set an empty array or default value for categoryNameandSCore
        user: auth?.user.email,
        userID: auth?.user?._id,
      });
      navigate('/result');
    }
    const categoryScoresPsycho = {};
  
    for (const { url, categoryName } of urls) {
      try {
        const { data } = await axios.get(url);
        const questions = data?.allquestion || [];
        let score = 0;
  
        questions.forEach((q) => {
          const selectedAnswer = selectedAnswers[q._id];
          if (selectedAnswer === "Strongly disagree / पूरी तरह असहमत") {
            score += 0;
          } else if (selectedAnswer === "Disagree / असहमत") {
            score += 1;
          } else if (selectedAnswer === "Neutral / तटस्थ") {
            score += 2;
          } else if (selectedAnswer === "Agree / सहमत") {
            score += 3;
          } else if (selectedAnswer === "Strongly Agree / पूर्णतः सहमत") {
            score += 4;
          }
        });
        console.log(selectedAnswers)
        categoryScoresPsycho[categoryName] = score;
      } catch (error) {
        console.log(`Error fetching data from ${url}:`, error);
      }
    }

     const TopSixScores = Object.entries(categoryScoresPsycho)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6);
        const sixthans = TopSixScores[5][0];
        console.log(typeof(TopSixScores))
  
    // Get the top three scores
    const topScores = Object.entries(categoryScoresPsycho)
      .sort((a, b) => b[1] - a[1]) // Sort scores in descending order
      .slice(0, 3); // Get the top three scores

      console.log(topScores)
      console.log(topScores[0][1])
      console.log(topScores[1][1])
      console.log(topScores[2][1])
      const firstt=topScores[0][1]
      const secondd=topScores[1][1]
      const thirdd= topScores[2][1]

        const TopFourScores = Object.entries(categoryScoresPsycho)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4);
        const fourthans = TopFourScores[3][0];
        localStorage.setItem('FourthScore', JSON.stringify(fourthans));
    
        const TopFiveScores = Object.entries(categoryScoresPsycho)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);
        const fifthans = TopFiveScores[4][0];
        localStorage.setItem('FifthScore', JSON.stringify(fifthans));
        
        await axios.post(`${process.env.REACT_APP_API}/api/question/post-psycho-score`,{
          categoryNameandSCore:TopSixScores,
          user: auth?.user.email,
          userID: auth?.user?._id
        })
        localStorage.setItem('SixthScore', JSON.stringify(sixthans));
    
        const topThreeScores = {};
        topScores.forEach(([categoryName, score]) => {
          topThreeScores[categoryName] = score;
          console.log(`Score for ${categoryName}: ${score}`);
        });
    
        const topThreeScoresString = topScores.map(([categoryName, score]) => {
          return categoryName;
        }).join('');
        console.log(`String: ${topThreeScoresString}`);
    
        localStorage.setItem('categoryScoresPsycho', JSON.stringify(topThreeScores));
        localStorage.setItem('topThreeScoresString', JSON.stringify(topThreeScoresString));
        console.log(categoryScoresPsycho)
        console.log(topThreeScoresString)
        setCategoryScoresPsycho(topThreeScores);
        toast.success("Thankyou for taking the test");
        navigate('/result');
      
  };
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="psycho-page">
      <div className="container p-4">
          <div class="card-header-psycho">
            <h1 class="text-center">Psychometric Test</h1>
          </div>
          {questionsLoaded ? (
          <div class="card-body">
          <div className="timer">Time Remaining: {formatTime(timer)}</div>
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
          </div>
          ) : (
          <CircularLoader />
          )}
          </div>
      </div>
    </Layout>
  );
};

export default PsychometricPage;
