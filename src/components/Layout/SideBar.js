import React from 'react';
import './Layout.css';


const SideBar = () => {
  return (
    <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <a
            href="\mainpage"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Main dashboard</span>
          </a>
          <a href="/adminprofile" className="list-group-item list-group-item-action py-2 ripple active">
            <i className="fas fa-regular fa-user me-3"></i><span>Profile</span>
          </a>
          <a href="/donationhome" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-lock fa-fw me-3"></i><span>Donation</span>
          </a>
          <a href="/report" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-lock fa-fw me-3"></i><span>Reports</span>
          </a>
          <a href="/manualbackup" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-lock fa-fw me-3"></i><span>Manual Backup</span>
          </a>
          <a href="/donationhome" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-lock fa-fw me-3"></i><span>Masters</span>
          </a>
          <a href="/logout" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-power-off me-3"></i><span>Logout</span>
          </a>
          {/* Add more list items here */}
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
