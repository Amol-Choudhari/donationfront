import React from 'react';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import './MainPage.css';
import { Link } from 'react-router-dom';

const MainPage = () => {
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
              <div className="col-md-4 d-flex align-items-stretch">
                <div className="card m-2" style={{width: "100%"}}>  {/* Use 100% width for full column usage */}
                  <img className="card-img-top" src="kisspng-computer-icons-users-group-icon-design-joining-5ae165f181f1d7.5080867215247211375323.png" alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Users</h5>
                    <p className="card-text">Look up the users, add users , edit user, delete user, user listing, click to the do the opertaions</p>
                    <Link to="/manageusers" className="btn btn-primary">Go To Users</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex align-items-stretch">
                <div className="card m-2" style={{width: "100%"}}>
                  <img className="card-img-top" src="vecteezy_donation-box-with-gold-coin-vector-man-giving-charity-to-a_9665129.png" alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Donations</h5>
                    <p className="card-text">Donation related information, click to proceed</p>
                    <Link to="/donations" className="btn btn-primary">Go to Donations</Link>
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

export default MainPage;
