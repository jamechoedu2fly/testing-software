import React from 'react';
import '../../styles/Sidebar.css'; // Import the CSS file for styling
import testlogo from '../../styles/testlogo.png'; // Import your sidebar image
import Layout from './Layout';
import { useAuth } from "../../context/auth";
import jamechologo from "../../styles/jamecho-logo.jpeg"
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const goHome = ()=>{
    navigate('/')
  }
  const goTest = ()=>{
    navigate('/test')
  }
  const goProfile = ()=>{
    navigate('/dashboard/user')
  }
  const gotoTest =()=>{
    navigate('/test')
  }
  return (
    <Layout>
      <div className="container land-cont">
        <div className="sidebar side-land">
          {/* Gray sidebar */}
          <div className="sidebar-content">
            <img src={jamechologo} className='land-logo'/>
            <div className="sidebar-buttons">
              <button onClick={goHome}>Home</button>
              <button onClick={goTest}>Test</button>
              <button onClick={goProfile}>Profile</button>
            </div>
            <p className='land-p'>Hi, {auth?.user?.name} </p>
          </div>
        </div>
        <div className="content content-land">
          <div className="card-container">
            <div className="card square-card">
              {/* Square card */}
              <h2>PROFILE</h2>
              <h3>Welcome {auth?.user?.name}</h3>
              <h6>CREDENTIALS</h6>
              <h6>Phone: {auth?.user?.phone}</h6>
              <h6>Email: {auth?.user?.email}</h6>
            </div>
            <div className="card vertical-card">
              {/* Vertical card */}
              <h4>Jamecho's talentasses test</h4>
              <p>
                The JAMECHO TALENT ASSESS TEST is a psychometric test that evaluates a range of personality dimensions such as Realistic, Investigative, Artistic, Social, Enterprising, and Conventional skills along with aptitude check. The scores of the test are then evaluated comprehensively to provide you with the career options that are best suited to your results.
              </p>
              <button className='land-test-btn' onClick={gotoTest}>Start test</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Sidebar;
