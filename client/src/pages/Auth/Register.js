import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();// prevent default 
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, {
                name,
                email,
                password,
                phone
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login')
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout>
            <div className='register'>
                <h1>Register Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder='Enter your name'
                        />
                    </div>

                    <div className="mb-3">
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder='Enter email address'
                        />
                    </div>
                    <div className="mb-3">
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder='Enter your password'
                        />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder='Enter your phone number'
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary">
                        REGISTER
                    </button>
                </form>

            </div>

        </Layout>
    )
}

export default Register