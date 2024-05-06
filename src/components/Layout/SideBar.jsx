import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogout = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const token = sessionStorage.getItem('jwtToken');

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
    <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <Link to="/mainpage" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Main dashboard</span>
          </Link>
          <Link to="/adminprofile" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-regular fa-user me-3"></i><span>Profile</span>
          </Link>
          <Link to="/donation" className="list-group-item list-group-item-action py-2 ripple">           
            <i className="fas fa-lock fa-fw me-3"></i><span>Donation</span>
          </Link>
          <Link to="/report" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-lock fa-fw me-3"></i><span>Reports</span>
          </Link>
          <Link to="/manualbackup" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-lock fa-fw me-3"></i><span>Manual Backup</span>
          </Link>
          <Link to="/masters" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-lock fa-fw me-3"></i><span>Masters</span>
          </Link>
          <Link to="/logout" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-power-off me-3"></i><span onClick={handleLogout}>Logout</span>
          </Link>
          {/* Add more list items here */}
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
