import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const SideBar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('jwtToken');
  const decodedToken = jwtDecode(token);

  const handleLogout = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      /*axios.get('http://localhost:8081/logout', {},
        {'Content-Type':'application/json','Authorization': `Bearer ${token}`});*/
      sessionStorage.removeItem('jwtToken');
      navigate('/login'); // Navigate to homepage or dashboard after login

    } catch (error) {
      alert("Please try again.");
      navigate('/login');
    }
  };

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/mainpage">
                <div class="sidebar-brand-text mx-3">Jai Guru Mauli</div>
            </a>
      <li className="nav-item active">
        <Link className="nav-link" to="/mainpage">
          <i className="fas fa-home fa-fw me-3"></i>
          <span>Home</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to={`/userform/${decodedToken.userid}`}>
          <i className="fas fa-regular fa-user-md me-4"></i>
          <span>Profile</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/manageusers">
          <i className="fas fa-regular fa-users me-3"></i>
          <span>Users</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/donation">
          <i className="fas fa-inr fa-fw me-3"></i>
          <span>Donations</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/report">
          <i className="fas fa-file-text fa-fw me-3"></i>
          <span>Reports</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/manualbackup">
          <i className="fas fa-database fa-fw me-3"></i>
          <span>Backup</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/masters">
          <i className="fas fa-table fa-fw me-3"></i>
          <span>Masters</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/logout">
          <i className="fas fa-power-off me-3"></i>
          <span>Logout</span>
        </Link>
      </li>
    </ul>
  );
}

export default SideBar;
