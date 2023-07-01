import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../context/auth';
const Result = () => {
    const location = useLocation();
   
    const [auth,setAuth] = useAuth();
    const [latestScore,setLatestScore] = useState(0);
    useEffect(() => {
        const fetchLatestScore = async () => {
          if (!auth?.user?._id) {
            return; // If user ID is not available, return early
          }
      
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API}/api/question/get-apti-score`,
              {
                params: {
                  userId: auth.user._id,
                },
              }
            );
      
            const { allResults } = response.data;
            const userResults = allResults.filter(
              (result) => result.user === auth.user._id
            );
      
            if (userResults.length > 0) {
              const latestScore = userResults[userResults.length - 1].score;
              setLatestScore(latestScore);
            }
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
                                
                            <h3>Total Score:{latestScore}</h3>
                                {/* Render the aptitude test result data */}
                                <ul>
                                    {/* {Object.keys(aptitudeResult).map((key) => (
                  <li key={key}>
                    <strong>{key}:</strong> {aptitudeResult[key]}
                  </li>
                ))} */}
                                </ul>
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
                                <ul>
                                    {/* {Object.keys(psychometricResult).map((key) => (
                  <li key={key}>
                    <strong>{key}:</strong> {psychometricResult[key]}
                  </li>
                ))} */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Result