import React from 'react'
import { NavLink } from "react-router-dom"
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = async () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully!!!");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse"
                        id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                < NavLink to="/" className="nav-link active" aria-current="page" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/test" className="nav-link" >Test</NavLink>
                            </li>

                            {!auth?.user ? (
                                <> <li className="nav-item">
                                    <NavLink to="/register" className="nav-link" >Register</NavLink>
                                </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link" >Login  </NavLink>
                                    </li></>)
                                : (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/login"
                                                onClick={handleLogout}
                                                className="nav-link"  >
                                                Logout
                                            </NavLink>

                                        </li>
                                    </>
                                )}
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header