import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout/Layout'

const Aptitude = () => {
    const [question, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        const getAllQuestion = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API}/api/question/get-all-question/648c7c9c9aee6736740e6a12`
                )
                setQuestions(data?.allquestion);
            } catch (error) {
                console.log(error);
            }
        };
        getAllQuestion();
    }, []);

    const handleAnswerSelection = (qId, selectedOption) => {
        setSelectedAnswers((prevState) => ({
            ...prevState,
            [qId]: selectedOption
        }));
    };

    const calculateTotalScore = () => {
        let point = 0;
        question.forEach((q) => {
            const selectedAnswer = selectedAnswers[q._id];
            if (selectedAnswer === q.correctAnswer) {
                point += q.point;
            }
        });
        setTotalScore(point);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateTotalScore();
    };


    return (
        <Layout>
            <div class="container p-4">
                <div class="card">
                    <div class="card-header ">
                        <h1 class="text-center">Aptitude Test</h1>
                    </div>
                    <div class="card-body">
                        <form onSubmit={handleSubmit}>
                            {question?.map((q) => (
                                <div class="card mb-4" key={q._id}>
                                    <div class="card-body">
                                        <h4>{q.question}</h4>
                                        {q.option?.map((p) => (
                                            <div class="form-check" key={p}>
                                                <input class="form-check-input"
                                                    type="radio"
                                                    name={q._id} value={p} id={p}
                                                    onChange={() => handleAnswerSelection(q._id, p)} />
                                                <label class="form-check-label" for={p}>{p}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div class="card-footer bg-light">
                        <h3 class="text-center">Total Score: {totalScore}</h3>
                    </div>
                </div>
            </div>


        </Layout>
    );
};

export default Aptitude