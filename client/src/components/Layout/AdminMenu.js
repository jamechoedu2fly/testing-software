import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-aptitude"
            className="list-group-item list-group-item-action"
          >
            Create Aptitude Question
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-preassessment"
            className="list-group-item list-group-item-action"
          >
            Create Pre-assessment Question
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-psycho"
            className="list-group-item list-group-item-action"
          >
            Create Psychometric Question
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;