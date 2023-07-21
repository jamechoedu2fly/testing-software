import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../../styles/RegisterPage.css';
import jamechoLogo from '../../styles/jamecho-logo.jpeg';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  // form validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default
    // Perform form validation
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    } else {
      setEmailError('');
    }

    if (!validatePhone(phone)) {
      setPhoneError('Invalid phone number');
      return;
    } else {
      setPhoneError('');
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, {
        name,
        email,
        password,
        phone,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <div className="register-container">
        <div className="register-card">
          <h1>REGISTER</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control signup-form"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control signup-form"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email address"
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control signup-form"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control signup-form"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your phone number"
              />
              {phoneError && <p className="error-message">{phoneError}</p>}
            </div>
            <button type="submit" className="btn btn-primary submit-signup-button">
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
