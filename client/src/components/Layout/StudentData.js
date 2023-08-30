import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";

const StudentData = () => {
  const [aptitudeResults, setAptitudeResults] = useState([]);
  const [PreResults, setPreResults] = useState([]);
  const [psychoResults, setPsychoResults] = useState([]);


  useEffect(() => {
    // Define a function to fetch aptitude results
    const fetchAptitudeResults = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/question/get-apti-score`);
        const resultArray = response.data.allResults;
        setAptitudeResults(resultArray);
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    // Call the function to fetch aptitude results
    fetchAptitudeResults();
  }, []);

  useEffect(() => {
    // Define a function to fetch aptitude results
    const fetchPreResults = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/question/get-pre-score`);
        const resultArray = response.data.allResults;
        setPreResults(resultArray);
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    // Call the function to fetch aptitude results
    fetchPreResults();
  }, []);


 
  useEffect(() => {
    // Define a function to fetch psychometric results
    const fetchPsychometricResults = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/question/get-psycho-score`);
        const resultArray = response.data.allResults;
        console.log(resultArray)
        setPsychoResults(resultArray);
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    // Call the function to fetch psychometric results
    fetchPsychometricResults();
  }, []);


  return (
    <Layout>
      <div style={{ display: "flex" }}> {/* Wrap all columns in a flex container */}
        {/* Column 1 */}
        <div style={{ flex: 1 }}>
        <h3>Aptitude Results</h3>
        <ul>
            {aptitudeResults
            .slice()
            .sort((a, b) => (a?._id || '').localeCompare(b?._id || ''))
            .map((result) => (
                <li key={result._id}>
                <h6>{result.user}</h6>
                <h6>{result._id}</h6>
                <ul>
                    {Object.entries(result.categoryNameandScore).map(([categoryName, score]) => (
                    <li key={categoryName}>
                        {categoryName}: {score}
                    </li>
                    ))}
                </ul>
                </li>
            ))}
        </ul>
        </div>

        {/* Column 2 */}
        <div style={{ flex: 1 }}>
        <h3>PreAssessment Results</h3>
        <ul>
            {PreResults
            .slice()
            .sort((a, b) => (a?._id || '').localeCompare(b?._id || ''))
            .map((result) => (
                <li key={result._id}>
                <h6>{result.user}</h6>
                <h6>{result._id}</h6>
                <ul>
                    {Object.entries(result.categoryNameandScore).map(([categoryName, score]) => (
                    <li key={categoryName}>
                        {categoryName}: {score}
                    </li>
                    ))}
                </ul>
                </li>
            ))}
        </ul>
        </div>
        <div style={{ flex: 1 }}>
          <h3>Psychometric Results</h3>
          <ul>
            {psychoResults
              .slice()
              .sort((a, b) => (a?._id || '').localeCompare(b?._id || ''))
              .map((result) => (
                <li key={result._id}>
                  <h6>{result.user}</h6>
                  <h6>{result._id}</h6>
                  <ul>
                    {Object.entries(result.categoryNameandScore).map(([categoryName, score]) => (
                      <li key={categoryName}>
                        {categoryName}: {score}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default StudentData;
