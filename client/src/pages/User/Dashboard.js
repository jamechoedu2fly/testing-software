import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "../../styles/UserProfile.css";
import update from "../../styles/update.jpg";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="background-image">
        <div className="card d-flex justify-content-between card-dash-user home-header">
          <div className="card-user-content">
            <h2>PROFILE</h2>
            <h3>Welcome {auth?.user?.name}</h3>
            <h6>CREDENTIALS</h6>
            <h6>Phone: {auth?.user?.phone}</h6>
            <h6>Email: {auth?.user?.email}</h6>
            <UserMenu />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
