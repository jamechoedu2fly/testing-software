import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';


const PsychometricPage = () => {
  const [questions, setQuestions] = useState([]);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  
  const calculateScore = (option) => {
    if (option === '0') return 0;
    if (option === '1') return 1;
    if (option === '2') return 2;
    if (option === '3') return 3;
    if (option === '4') return 4;
    return 0;
  };  

  const urls = [
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/64a938af3a0d5ef596eede01/64a93abb04ceb32efe9ebbf2`,
      categoryName: "Realistic"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/64a938af3a0d5ef596eede01/64a93ad004ceb32efe9ebbf4`,
      categoryName: "Artistic"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/64a938af3a0d5ef596eede01/64a93adf04ceb32efe9ebbf6`,
      categoryName: "Investigative"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/64a938af3a0d5ef596eede01/64a93ae904ceb32efe9ebbf8`,
      categoryName: "Social"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/64a938af3a0d5ef596eede01/64a93af404ceb32efe9ebbfa`,
      categoryName: "Enterprising"
    },
    {
      url: `${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/64a938af3a0d5ef596eede01/64a93b0404ceb32efe9ebbfc`,
      categoryName: "Conventional"
    },
  ];
  
  const getAllPsyQuestion = async () => {
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
    getAllPsyQuestion();
  }, []);

  const [scores, setScores] = useState({
    Realistic: 0,
    Artistic: 0,
    Investigative: 0,
    Social: 0,
    Enterprising: 0,
    Conventional: 0,
  });

  const handleOptionChange = (questionId, option) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.map((q) => {
        if (q._id === questionId) {
          return { ...q, selectedOption: option };
        }
        return q;
      });
      return updatedQuestions;
    });
  
    const category = urls.map((url) => url.categoryName);
    console.log(questionId);
    console.log(category)
    const score = calculateScore(option);
  
    setScores((prevScores) => ({
      ...prevScores,
      [category]: prevScores[category] + score,
    }));
  };
  
  useEffect(() => {
    console.log(scores);
  }, [scores]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(scores);
  };

  return (
    <Layout>
      <div class="container p-4">
        <div className="card">
          <div className="card-header">
            <h1 className="text-center">Psychometric-Test</h1>
          </div>
          <div className='container p-4'>
            <div className='card p-4'>
              <h5 style={{ "color": "red" }}>Choose one of these options. There are no wrong answers. All questions are compulsory.
                The Scores from 0 to 4 indicates the following:</h5> <hr />
              <li>0- Strongly disagree</li>
              <li>1-Disagree</li>
              <li>2-Neutral</li>
              <li>3-Agree</li>
              <li>4-Strongly Agree</li>
            </div>
          </div>
          <div className="card-body">
            <form>
              {questions?.map((q, i) => (
                <div className="card mb-4" key={q._id}>
                  <div className="card-body">
                    <h4>{i + 1}. {q.question}</h4>
                    <p className='p-2 ' style={{ color: 'red' }}>Mark only one Option</p> <hr />
                    {q.option?.map((p) => (
                      <div className="form-check" key={p}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={q._id}
                          value={p}
                          id={p}
                          onChange={(e) => handleOptionChange(q._id, e.target.value)}
                        />
                        <label className="form-check-label" htmlFor={p}>
                          {p}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
             <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>

            </form>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className="mt-4">
        </div>
      </div>

    </Layout>
  );
};

export default PsychometricPage;
