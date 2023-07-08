import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Bar } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const [auth, setAuth] = useAuth();
  const [totalScore, setTotalScore] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const location = useLocation();
  const categoryScores = location.state?.categoryScores || {};
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

  

  return (
    <Layout>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h2 className="text-center">Aptitude Test Result</h2>
              </div>
              <div className="card-body">
                <h3>Total Score: {totalScore}</h3>
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h2 className="text-center">Psychometric Test Result</h2>
              </div>
              <div className="card-body">
                {/* Render the psychometric test result data */}
                <ul>{/* Render the psychometric test result data */}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Result;
