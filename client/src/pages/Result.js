import React from 'react'
import Layout from '../components/Layout/Layout'

const Result = () => {
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