import React from 'react';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';

import { useLocation } from 'react-router-dom';

const ReportPage = () => {
  const location = useLocation();

  // Check if the current pathname matches the donation page path
  const isDonationPage = location.pathname === '/report';

  return (
    <div className="container-fluid pt-4">  
      <NavBar />
      <div className="row">
        <div className="col-lg-3">
          <SideBar />
        </div>
        <div className="col-lg-9" style={{ marginTop: '58px' }}>
          <div className="container">
            <h2 className="mt-3 mb-4">Reports</h2>
            <div className='col-md-12 row'>
                <div className="mb-4 col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">  Users Reports</h5>
                            <p class="card-text">List of users added to the application </p>
                            <button type="button" class="btn btn-primary" data-mdb-ripple-init>Check</button>
                        </div>
                    </div>         
                </div>
                <div className="mb-4 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Donation Reports</h5>
                        <p class="card-text">List of donation made ot the temple</p>
                        <button type="button" class="btn btn-primary" data-mdb-ripple-init>Check</button>
                    </div>
                </div>
                </div>
            </div>
         
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
