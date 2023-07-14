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
              <h6>It is a test of cognitive abilities, such as mathematical, logical, verbal and non verbal reasoning to assess the logical thinking and problem-solving skills.</h6>
            </Link>
          </div>

          {/* Psychometric Test Section */}
          <div className="section-card">
            <Link to="/preassessment" className="section-link">
              <h2>PSYCHOMETRIC TEST</h2>
              <p>Click here to take the psychometric test</p>
             <h6>Personality helps you in identifying your personality traits which in turn will help you in selecting the right career options for yourself.</h6>
              <h6>A psychometric test is a scientific way to identify the existing skills and interests of students to assess their personalities. Psychometrics is concerned with the objective measurement of latent constructs that cannot be directly observed. Examples of latent constructs include intelligence, introversion, mental disorders, and educational achievement.</h6>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TestPage;
