import React from 'react';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
  return (
    <div className="container-fluid pt-4">  
      <NavBar />
      <div className="row">
        <div className="col-lg-3">
          <SideBar />
        </div>
        <div className="col-lg-9" style={{ marginTop: '58px' }}>
          <div className="container">
            <div className="row justify-content-center">
             
            <table className="table align-middle mb-0 bg-white table-bordered">
              <thead className="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                    
                      <div className="ms-3">
                        <p className="fw-bold mb-1">John Doe</p>
                        <p className="text-muted mb-0">john.doe@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  {/* Add other table cells similarly */}
                </tr>
                {/* Add other table rows similarly */}
              </tbody>
            </table>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
