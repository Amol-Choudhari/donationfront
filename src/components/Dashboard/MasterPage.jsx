import React from 'react';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';

import { useLocation } from 'react-router-dom';

const MasterPage = () => {
  const location = useLocation();

  // Check if the current pathname matches the donation page path
  const isDonationPage = location.pathname === '/donation';

  return (
    <div className="container-fluid pt-4">  
      <NavBar />
      <div className="row">
        <div className="col-lg-3">
          <SideBar />
        </div>
        <div className="col-lg-9" style={{ marginTop: '58px' }}>
          <div className="container">
            <h2 className="mt-3 mb-4">Masters</h2>
            
          

          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterPage;
