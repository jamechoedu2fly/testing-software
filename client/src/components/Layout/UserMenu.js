import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <div>
            <div className="text-center mt-4">
                <div className="list-group">
                    <h4>User Panel</h4>
                    <NavLink
                        to="/dashboard/user/profile"
                        className="list-group-item list-group-item-action"
                    >
                        Profile
                    </NavLink>

                </div>
            </div>
        </div>
    )
}

export default UserMenu