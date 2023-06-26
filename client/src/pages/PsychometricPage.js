import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout/Layout';

const PsychometricPage = () => {
  const [questions, setQuestions] = useState([]);

  const getAllPsyQuestion = async () => {
    try {
      const categoryIds = [
        '6494a353a02f471b87822911',
        '6494a38ca02f471b87822913',
        '6494a398a02f471b87822915',
        '6494a39fa02f471b87822917',
        '6494a3a9a02f471b87822919',
        '6494a3b1a02f471b8782291b'
      ];

      const promises = categoryIds.map(async (categoryId) => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/question/get-all-psychometric-question/${categoryId}`);
        return data.allquestion;
      });

      const responses = await Promise.all(promises);
      const allQuestions = responses.flatMap((questions) => questions);
      setQuestions(allQuestions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPsyQuestion();
  }, []);

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
              {questions.map((q, i) => (
                <div className="card mb-4" key={q._id}>
                  <div className="card-body">
                    <h4>{i + 1}. {q.question}</h4>
                    <p className='p-2 ' style={{ color: 'red' }}>Mark only one Option</p> <hr />
                    {q.option.map((p) => (
                      <div className="form-check" key={p}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={q._id}
                          value={p}
                          id={p}
                        />
                        <label className="form-check-label" htmlFor={p}>
                          {p}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PsychometricPage;
