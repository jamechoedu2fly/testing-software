import Layout from '../components/Layout/Layout';
import React from 'react';
import "../styles/HomeStyle.css";
import { useNavigate } from 'react-router-dom';
import '../styles/TestPageStyle.css';
import apti from "../styles/apti.png";
import psycho from "../styles/psycho.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className='background-image'>
        <div className='content-container'>
          <h1 className='home-header'>
            Jamecho's Talentasses <br /> Test
          </h1>
          <p className='home-para'>Shaping Your Future.</p>
        </div>
      </div>
      <div className="container test-cont">
        <h1 className="heading">What is JTAT</h1>
        <p className='jtat-p'>
          <span>The JAMECHO TALENT ASSESS TEST is a psychometric test that comes</span><br />
          <span>evaluates a range of personality dimensions such as Realistic,</span><br />
          <span>Investigative, Artistic, Social, Enterprising, and Conventional skills along</span><br />
          <span>with aptitude check. The scores of the test are then evaluated</span><br />
          <span>comprehensively to provide you with the career options that are best</span><br />
          <span>suited to your results.</span>
        </p>
        <hr />
        <div className='main-color'>
          <div className="cards-container">
            {/* Aptitude Section */}
            <div className="section-card-apti">
              <img src={apti} alt="Aptitude test" className='circle-img' />
              <h2>Aptitude test</h2>
              <p>It is a test of cognitive abilities, such as mathematical, logical, verbal and nonverbal reasoning to assess the logical thinking and problem-solving skills.</p>
            </div>

            {/* Psychometric Test Section */}
            <div className="section-card-psycho">
              <img src={psycho} alt="Aptitude test" className='circle-img' />
              <h2>Psychometric test</h2>
              <p>Psychometric test helps you in identifying your personality traits which in turn will help you in selecting the right career options for yourself.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
