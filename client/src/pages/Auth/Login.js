import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../context/auth'
import "../../styles/LoginPage.css"
import signup from "../../styles/signup-image.jpg"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth()

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, {
                email,
                password,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate('/sidebar') // test page
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout>
            <div className="login-container">
                <div className="register-image">
                    <img src={signup} alt="Signup" />
                </div>
                <div className='login-card'>
                    <h1>Sign in</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder='Your email address'
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder='Password'
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login;
