import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-subcategory"
            className="list-group-item list-group-item-action"
          >
            Create Sub-Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-question"
            className="list-group-item list-group-item-action"
          >
            Create Question
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;