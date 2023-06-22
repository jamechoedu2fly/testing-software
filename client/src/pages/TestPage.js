import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom';
import "../styles/TestPageStyle.css"
const TestPage = () => {
    return (
        <Layout>
            <div className="container" >
                <h1 className='text-center'>TEST PAGE</h1>
                <hr />

                <div className="row">
                    {/* Aptitude Section */}
                    <div className="col-md-6">
                        <Link to="/aptitude/:categoryId" className="section-link">
                            <div className="section-card">
                                <h2>APTITUDE TEST</h2>
                                <p>Click here to take the aptitude test</p>
                            </div>
                        </Link>
                    </div>

                    {/* Psychometric Test Section */}
                    <div className="col-md-6">
                        <Link to="/preassessment" className="section-link">
                            <div className="section-card">
                                <h2>PSYCHOMETRIC TEST</h2>
                                <p>Click here to take the psychometric test</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default TestPage