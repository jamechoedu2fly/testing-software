import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../styles/UserProfile.css";

const UserMenu = () => {
    return (
        <div className="text-center mt-4">
            <div className="list-group user-menu-container">
                <NavLink
                    to="/dashboard/user/profile"
                    className="list-group-item list-group-item-action user-bttn"
                >
                    Update Profile
                </NavLink>
                <NavLink
                    to="/test"
                    className="list-group-item list-group-item-action user-bttn"
                >
                    Start Test
                </NavLink>
            </div>
        </div>
    );
};

export default UserMenu;
