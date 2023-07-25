import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import '../styles/TestPageStyle.css';
import apti from "../styles/apti.png";
import psycho from "../styles/psycho.png"
import testLogo from "../styles/bg-logo.jpeg"
import { useNavigate } from 'react-router-dom';
const TestPage = () => {
  const navigate= useNavigate();
  const openApti = () => {
    navigate('/aptitude/:categoryId')
  }
  const openPsycho = () => {
    navigate('/preassessment')
  }
  return (
    <Layout>
      <div className="container cont-test">
      <div className="sidebar sidebar-test">
        <img
          src={testLogo} // Replace with the path to your sidebar image
          alt="Sidebar"
          className="sidebar-image"
        />
      </div>
      <div className="content">
        <div className="card-apti">
          <h3>Aptitude and Psychometric test</h3>
          <button className='btn btn-primary btn-testing' onClick={openApti}>Start test</button>
        </div>
        {/* <div className="card-psycho">
          <h3>Psychometric test</h3>
          <button className='btn btn-primary btn-testing' onClick={openPsycho}>Start psychometric test</button>
        </div> */}
      </div>
    </div>
    </Layout>
  );
}

export default TestPage;
