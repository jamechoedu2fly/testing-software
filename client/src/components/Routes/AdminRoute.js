import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import ErrorPage from "../Layout/ErrorPage";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
          if (auth?.token) {
            try {
              const res = await axios.get(
                `${process.env.REACT_APP_API}/api/auth/admin-auth`
              );
              setOk(res.data.ok);
            } catch (error) {
              setOk(false);
            }
          }
        };
        authCheck();
      }, [auth?.token]);
    
      // If the user is not authorized, show the ErrorPage component
      return ok ? <Outlet /> : <Outlet />;
    }