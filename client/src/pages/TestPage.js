import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import '../styles/TestPageStyle.css';

const TestPage = () => {
  return (
    <Layout>
      <div className="container">
        <h1 className="heading">TEST PAGE</h1>
        <hr />
        <div className="cards-container">
          {/* Aptitude Section */}
          <div className="section-card">
            <Link to="/aptitude/:categoryId" className="section-link">
              <h2>APTITUDE TEST</h2>
              <p>Click here to take the aptitude test</p>
            </Link>
          </div>

          {/* Psychometric Test Section */}
          <div className="section-card">
            <Link to="/preassessment" className="section-link">
              <h2>PSYCHOMETRIC TEST</h2>
              <p>Click here to take the psychometric test</p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TestPage;
