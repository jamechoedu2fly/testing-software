import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import careerChoices from '.././careerChoices.json';
import subjectChoices from '.././subjectChoices.json';
import ConventionalSubjects from '.././ConventionalSubjects.json'
import "../styles/ResultStyle.css"

const Result = () => {
  const [auth, setAuth] = useAuth();
  const [totalScore, setTotalScore] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const location = useLocation();
  const [careerList, setCareerList] = useState(null);
  const [subjectList, setSubjectList] = useState(null);
  const [conventionalSubjects, setConventionalSubjects] = useState([]);
  const [aptitudeResults, setAptitudeResults] = useState([]);
  const [psychoResults, setPsychoResults] = useState([]);
  const [topThreeScores, setTopThreeScores] = useState([]);
  const [PreResults, setPreResults] = useState([]);

  useEffect(() => {
    // Define a function to fetch aptitude results
    const fetchPreResults = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/question/get-pre-score`);
        const resultArray = response.data.allResults;
        const userResultPre = resultArray.find(result => result.user === auth?.user?.email);
        console.log(userResultPre);

        const preSubject = userResultPre.categoryNameandScore;
        console.log(preSubject)
        const scoresArray = Object.entries(preSubject);

        // Sort the scoresArray in descending order based on the scores
        scoresArray.sort((a, b) => b[1] - a[1]);
  
        // Extract the top three elements from the sorted array
        const topSubject = scoresArray.slice(0, 1);
        const MaxScoreSub= topSubject[0][0]
        console.log(MaxScoreSub)
        setSubjectList(MaxScoreSub);
        setPreResults(resultArray);
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    // Call the function to fetch aptitude results
    fetchPreResults();
  }, []);

  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderWidth: 5,
        radius: 100,
      },
    ],
  });


  useEffect(() => {
  // Define a function to fetch psychometric results
  const fetchPsychometricResults = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/question/get-psycho-score`);
      const resultArray = response.data.allResults;
      console.log(resultArray);

      // Find the object with user === auth?.user?.email
      const userResultPsycho = resultArray.find(result => result.user === auth?.user?.email);
      console.log(userResultPsycho);

      // Extract scores from the userResult.categoryNameandScore object
      const scores = userResultPsycho.categoryNameandScore;

      // Convert the scores object into an array of key-value pairs
      const scoresArray = Object.entries(scores);

      // Sort the scoresArray in descending order based on the scores
      scoresArray.sort((a, b) => b[1] - a[1]);

      // Extract the top three elements from the sorted array
      const topThreeScores = scoresArray.slice(0, 3);
      console.log(topThreeScores);
      const keysOfTopThreeScores = topThreeScores.map(([categoryName, score]) => categoryName).join('');
      console.log(keysOfTopThreeScores);
      setCareerList(keysOfTopThreeScores);
      const topFourthScore = scoresArray[3][0];
      const topFifthScore = scoresArray[4][0];
      const topSixthScore = scoresArray[5][0];
    
      console.log(topFourthScore);
      console.log(topFifthScore);
      console.log(topSixthScore);

      const updatedTopThreeScoresString = keysOfTopThreeScores.slice(0, -1) + topFourthScore;
      const updatedTopThreeScoresString2 = updatedTopThreeScoresString.slice(0, -1) + topFifthScore;
      const updatedTopThreeScoresString3 = updatedTopThreeScoresString2.slice(0, -1) + topSixthScore;

      setPsychoResults(resultArray);
      const pieData = {
        labels: topThreeScores.map(([categoryName, score]) => categoryName),
        datasets: [
          {
            data: topThreeScores.map(([categoryName, score]) => score),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
            ],
            borderWidth: 5,
            radius: 100,
          },
        ],
      };
      // Update the pieData state with the updated pieData object
      setPieData(pieData);
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  // Call the function to fetch psychometric results
  fetchPsychometricResults();
}, [auth]);



const [data, setData] = useState({
  labels: ['Language and Communication', 'Verbal and Non-verbal', 'Arithmetic'],
  datasets: [
    {
      label: 'Scores',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 1)',
    },
  ],
});

const options = {
  scales: {
    y: {
      beginAtZero: true,
      max: 36,
      stepSize: 6,
    },
  },
};

useEffect(()=> {
  const fetchAptitudeResults = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/question/get-apti-score`);
      const resultArray = response.data.allResults;
      console.log(response);
      
      // Find the object with user === auth?.user?.email
      const userResult = resultArray.find(result => result.user === auth?.user?.email);
      console.log(userResult);
  
      // Extract scores from the userResult.categoryNameandScore object
      const scores = Object.values(userResult.categoryNameandScore);
      console.log(scores)
  
      // Update the data object with the extracted scores
      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: scores,
          },
        ],
      });
  
      // Update the state with the aptitude results
      setAptitudeResults(resultArray);
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };
  fetchAptitudeResults();
}, []);

  
 

  const matchCareerChoices = () => {
    if (careerList && subjectList) {
      const matchedCareers = careerChoices.permutations.find((permutation) => {
        return permutation.code === careerList && permutation.subcategories[subjectList];
      });

      if (matchedCareers) {
        return matchedCareers.subcategories[subjectList];
      }
    }
    return [];
  };

  const matchSubjectChoices = () => {
    if (careerList && subjectList) {
      const matchedSubjects = subjectChoices.permutations.find((permutation) => {
        return permutation.code === careerList && permutation.subcategories[subjectList];
      });

      if (matchedSubjects) {
        return matchedSubjects.subcategories[subjectList];
      }
    }
    return [];
  };

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
                {matchCareerChoices().map((career, index) => (
                    <li key={index}>{career}</li>
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
                {matchSubjectChoices().map((career, index) => (
                    <li key={index}>{career}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="card result-card mb-4">
              <div className="card-header">
                <h4 className="text-center">CONVENTIONAL SUBJECTS</h4>
              </div>
              <div className="card-body">
                <ul>
                 
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