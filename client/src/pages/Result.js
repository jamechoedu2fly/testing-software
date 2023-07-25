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
    JSON.parse(localStorage.getItem('topThreeScoresString')) || ""
  );
  const [FourthScore, setFourthScore] = useState(
    JSON.parse(localStorage.getItem('FourthScore')) || {}
  );
  const [FifthScore, setFifthScore] = useState(
    JSON.parse(localStorage.getItem('FifthScore')) || {}
  );
  const [SixthScore, setSixthScore] = useState(
    JSON.parse(localStorage.getItem('SixthScore')) || {}
  );
  const updatedTopThreeScoresString = topThreeScoresString.slice(0, -1) + FourthScore;
  const updatedTopThreeScoresString2 = updatedTopThreeScoresString.slice(0, -1) + FifthScore;
  const updatedTopThreeScoresString3 = updatedTopThreeScoresString2.slice(0, -1) + SixthScore;
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

  const clearLocalStorage = () => {
    localStorage.removeItem('categoryScores');
    localStorage.removeItem('categoryScoresPsycho');
    localStorage.removeItem('categoryScoresPre');
    localStorage.removeItem('topThreeScoresString');
    localStorage.removeItem('FourthScore');
    localStorage.removeItem('FifthScore');
    localStorage.removeItem('SixthScore');
  };

  useEffect(() => {
    return () => {
      clearLocalStorage();
    };
  }, []);


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
  const fetchSubject = () => {
    const subject = careerChoices.permutations.find(
      (permutation) => permutation.code === topThreeScoresString
    )?.subcategories[categoryScoresPre];

    // Check if subject is undefined
if (subject === undefined) {
      const updatedSubject = careerChoices.permutations.find(
        (permutation) => permutation.code === updatedTopThreeScoresString
      )?.subcategories[categoryScoresPre];

if (updatedSubject===undefined){
  const updatedSubject2= careerChoices.permutations.find(
    (permutation)=> permutation.code=== updatedTopThreeScoresString2
  )?.subcategories[categoryScoresPre];

  if (updatedSubject2===undefined){
    const updatedSubject3= careerChoices.permutations.find(
      (permutation)=>permutation.code===updatedTopThreeScoresString3
    )?.subcategories[categoryScoresPre];
    setCareerList(updatedSubject3);
    console.log(updatedSubject3);
  }else{
    setCareerList(updatedSubject2);
    console.log(updatedSubject2);
  }
}else{
  setCareerList(updatedSubject);
  console.log(updatedSubject);
}
    } else{
      setCareerList(subject);
      console.log(subject);
    }
  };

  fetchSubject();
}, [topThreeScoresString, categoryScoresPre, careerChoices, updatedTopThreeScoresString,updatedTopThreeScoresString2,updatedTopThreeScoresString3]);


useEffect(() => {
  const ans = subjectChoices.permutations.find(
    (permutation) => permutation.code === topThreeScoresString
  )?.subcategories;

  if (ans === undefined) {
    const updatedAns = subjectChoices.permutations.find(
      (permutation) => permutation.code === updatedTopThreeScoresString
    )?.subcategories;

    if(updatedAns===undefined){
      const updatedAns2 = subjectChoices.permutations.find(
        (permutation) => permutation.code === updatedTopThreeScoresString2
      )?.subcategories;

      if(updatedAns2===undefined){
        const updatedAns3= subjectChoices.permutations.find(
          (permutation) => permutation.code === updatedTopThreeScoresString3
        )?.subcategories;
        setSubjectList(updatedAns3);
    console.log(updatedAns3);
      }else{
        setSubjectList(updatedAns2);
    console.log(updatedAns2);
      }
    }else{
      setSubjectList(updatedAns);
    console.log(updatedAns);
    }
  } else{
    setSubjectList(ans);
    console.log(ans);
  }
}, [topThreeScoresString, updatedTopThreeScoresString, subjectChoices,updatedTopThreeScoresString2,updatedTopThreeScoresString3]);


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