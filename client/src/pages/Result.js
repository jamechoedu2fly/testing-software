import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import careerChoices from '.././careerChoices.json';
import subjectChoices from '.././subjectChoices.json';
import "../styles/ResultStyle.css"
const Result = () => {
  const [auth, setAuth] = useAuth();
  const [totalScore, setTotalScore] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const location = useLocation();
  const [careerList, setCareerList] = useState(null);
  const [subjectList, setSubjectList] = useState(null);

  const [categoryScores, setCategoryScores] = useState(
    JSON.parse(localStorage.getItem('categoryScores')) || {}
  );
  const [categoryScoresPsycho, setCategoryScoresPsycho] = useState(
    JSON.parse(localStorage.getItem('categoryScoresPsycho')) || {}
  );
  const [categoryScoresPre, setCategoryScoresPre] = useState(
    JSON.parse(localStorage.getItem('categoryScoresPre')) || {}
  );
  const [topThreeScoresString, setTopThreeScoresString] = useState(
    JSON.parse(localStorage.getItem('topThreeScoresString')) || {}
  );
  const pieData = {
    labels: Object.keys(categoryScoresPsycho),
    datasets: [
      {
        data: Object.values(categoryScoresPsycho),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderWidth: 5,
        radius: 100,
      },
    ],
  };
  const data = {
    labels: ['Language and Communication', 'Verbal and Non-verbal', 'Arithmetic'],
    datasets: [
      {
        label: 'Scores',
        data: Object.values(categoryScores),
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 36,
        stepSize: 6,
      },
    },
  };

  useEffect(() => {
    const fetchLatestScore = async () => {
      if (!auth?.user?._id) {
        return;
      }
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/question/get-apti-score`, {
          params: {
            userId: auth.user._id,
          },
        });
        const { allResults } = response.data;
        const userResults = allResults.filter((result) => result.user === auth.user._id);
        if (userResults.length > 0) {
          const latestScore = userResults[userResults.length - 1].score;
          setTotalScore(latestScore);
        }

        // Process the category-wise results
        const categoryCounts = {};
        userResults.forEach((result) => {
          const categoryId = result.categoryId;
          if (categoryCounts[categoryId]) {
            categoryCounts[categoryId]++;
          } else {
            categoryCounts[categoryId] = 1;
          }
        });
        setCategoryData(categoryCounts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLatestScore();
  }, [auth]);

  useEffect(() => {
    const subject = careerChoices.permutations.find(
      (permutation) => permutation.code === topThreeScoresString
    )?.subcategories[categoryScoresPre];
    setCareerList(subject);
    console.log(subject);
  }, [topThreeScoresString, categoryScoresPre, careerChoices]);

  useEffect(() => {
    const ans = subjectChoices.permutations.find(
      (permutation) => permutation.code === topThreeScoresString
    )?.subcategories;
    setSubjectList(ans);
    console.log(ans);
  }, [topThreeScoresString, subjectChoices]);

  return (
    <Layout>
      <div className="container p-4">
        <div className="row result-row">
          <div className="col-md-6 result-col">
            <div className="card result-card mb-4">
              <div className="card-header">
                <h4 className="text-center">APTITUDE TEST RESULT</h4>
              </div>
              <div className="card-body">
                <h3>Total Score: {totalScore}</h3>
                <Bar data={data} options={options} />
              </div>
            </div>
            <div className="card result-card mb-4">
              <div className="card-header">
                <h4 className="text-center">CAREER CHOICES</h4>
              </div>
              <div className="card-body">
                <ul>
                  {careerList && careerList.map((subject, index) => (
                    <li key={index}>{subject}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 result-col">
            <div className="card result-card mb-4">
              <div className="card-header">
                <h4 className="text-center">PSYCHOMETRIC TEST RESULT</h4>
              </div>
              <div className="card-body psychometric" style={{ height: '365px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pie data={pieData} />
              </div>
            </div>
            <div className="card result-card mb-4">
              <div className="card-header">
                <h4 className="text-center">SUBJECT CHOICES</h4>
              </div>
              <div className="card-body">
                <ul>
                  {subjectList && subjectList.map((subject, index) => (
                    <li key={index}>{subject}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
  
  
};

export default Result;
