import React from 'react';
import './Layout.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // If it's a named export

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = sessionStorage.getItem('jwtToken');
    
    let decodedToken = null;
    
    // Decode the token safely if it exists
    try {
        decodedToken = token ? jwtDecode(token) : null;
    } catch (error) {
        console.error('Error decoding token:', error);
    }
    
    const handleLogout = async (event) => {
        event.preventDefault();
        sessionStorage.removeItem('jwtToken');
        navigate('/login');
    };

    // Helper function to determine the active class dynamically
    const getNavItemClass = (path) => 
        location.pathname === path ? 'nav-item active' : 'nav-item';

    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Brand */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/mainpage">
                <div className="sidebar-brand-text mx-3">Jai Guru Mauli</div>
            </a>

            {/* Navigation Links */}
            <li className={getNavItemClass('/mainpage')}>
                <Link className="nav-link" to="/mainpage">
                    <i className="fas fa-home fa-fw me-3"></i>
                    <span>Home</span>
                </Link>
            </li>

            {decodedToken && (
                <li className={getNavItemClass(`/userform/${decodedToken.userid}`)}>
                    <Link className="nav-link" to={`/userform/${decodedToken.userid}`}>
                        <i className="fas fa-user-md me-3"></i>
                        <span>Profile</span>
                    </Link>
                </li>
            )}

            <li className={getNavItemClass('/manageusers')}>
                <Link className="nav-link" to="/manageusers">
                    <i className="fas fa-users me-3"></i>
                    <span>Users</span>
                </Link>
            </li>

            <li className={getNavItemClass('/donation')}>
                <Link className="nav-link" to="/donation">
                    <i className="fas fa-inr fa-fw me-3"></i>
                    <span>Donations</span>
                </Link>
            </li>

            <li className={getNavItemClass('/report')}>
                <Link className="nav-link" to="/report">
                    <i className="fas fa-file-alt fa-fw me-3"></i>
                    <span>Reports</span>
                </Link>
            </li>

            <li className={getNavItemClass('/masters')}>
                <Link className="nav-link" to="/masters">
                    <i className="fas fa-table fa-fw me-3"></i>
                    <span>Masters</span>
                </Link>
            </li>

            <li className="nav-item">
                <button 
                    className="nav-link btn btn-link text-left"
                    onClick={handleLogout}
                >
                    <i className="fas fa-power-off me-3"></i>
                    <span>Logout</span>
                </button>
            </li>
        </ul>
    );
}

export default SideBar;