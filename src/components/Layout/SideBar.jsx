import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';

const SideBar = () => {
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
            <i className="fas fa-power-off me-3"></i><span>Logout</span>
          </Link>
          {/* Add more list items here */}
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
