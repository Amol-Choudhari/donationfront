import React from 'react';
import './Layout.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = sessionStorage.getItem('jwtToken');
    
    // Check if token exists before decoding
    const decodedToken = token ? jwtDecode(token) : null;
    
    const handleLogout = () => {
        sessionStorage.removeItem('jwtToken');
        navigate('/login');
    };

    // Helper function to determine active class dynamically
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/mainpage">
                <div className="sidebar-brand-text mx-3">Jai Guru Mauli</div>
            </a>

            {/* Refactored list items with isActive function */}
            <li className={`nav-item ${isActive('/mainpage')}`}>
                <Link className="nav-link" to="/mainpage">
                    <i className="fas fa-home fa-fw me-3"></i>
                    <span>Home</span>
                </Link>
            </li>

            {decodedToken && ( // Conditionally render profile link if user is logged in
                <li className={`nav-item ${isActive('/userform/' + decodedToken.userid)}`}>
                    <Link className="nav-link" to={`/userform/${decodedToken.userid}`}>
                        <i className="fas fa-user-md me-4"></i>
                        <span>Profile</span>
                    </Link>
                </li>
            )}

            <li className={`nav-item ${isActive('/manageusers')}`}>
                <Link className="nav-link" to="/manageusers">
                    <i className="fas fa-users me-3"></i>
                    <span>Users</span>
                </Link>
            </li>
            <li className={`nav-item ${isActive('/donation')}`}>
                <Link className="nav-link" to="/donation">
                    <i className="fas fa-inr fa-fw me-3"></i>
                    <span>Donations</span>
                </Link>
            </li>
            <li className={`nav-item ${isActive('/report')}`}>
                <Link className="nav-link" to="/report">
                    <i className="fas fa-file-text fa-fw me-3"></i>
                    <span>Reports</span>
                </Link>
            </li>
            <li className={`nav-item ${isActive('/manualbackup')}`}>
                <Link className="nav-link" to="/manualbackup">
                    <i className="fas fa-database fa-fw me-3"></i>
                    <span>Backup</span>
                </Link>
            </li>
            <li className={`nav-item ${isActive('/masters')}`}>
                <Link className="nav-link" to="/masters">
                    <i className="fas fa-table fa-fw me-3"></i>
                    <span>Masters</span>
                </Link>
            </li>
            <li className={`nav-item ${isActive('/login')}`}>
                <Link className="nav-link" to="/login" onClick={handleLogout}> 
                    <i className="fas fa-power-off me-3"></i>
                    <span>Logout</span>
                </Link>
            </li>
        </ul>
    );
}

export default SideBar;
