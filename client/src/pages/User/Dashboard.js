import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "../../styles/UserProfile.css"
const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <div className="card p-3 card-menu">
              <UserMenu />
            </div>
          </div>
          <div className="col-md-9">
            <div className="card d-flex justify-content-between card-dash-user">
              <div>
                <h4>Name: {auth?.user?.name}</h4>
                <h4>Email: {auth?.user?.email}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
