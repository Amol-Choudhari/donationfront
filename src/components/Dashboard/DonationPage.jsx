import React from 'react';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import { useForm } from 'react-hook-form'; // Example using react-hook-form

const DonationPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

  // Check if the current pathname matches the donation page path
  return (
    <div className="container-fluid pt-4">  
      <NavBar />
      <div className="row">
        <div className="col-lg-3">
          <SideBar />
        </div>
        <div className="col-lg-9" style={{ marginTop: '58px' }}>
          <div className="container">
            <h2 className="mt-3 mb-4">Donation Page</h2>
            
            {/* Add Donation Form */}
            <div className="mb-4">
              <h3>Add Donation</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount:</label>
                  <input type="number" className="form-control" id="amount" />
                </div>
                <button type="submit" className="btn btn-primary">Add Donation</button>
              </form>
            </div>

            {/* List of Donations Made */}
            <div className="mb-4">
              <h3>List of Donations Made</h3>
              {/* Dummy data for demonstration */}
              <ul className="list-group">
                <li className="list-group-item">Donation 1 - Amount: $100</li>
                <li className="list-group-item">Donation 2 - Amount: $200</li>
                <li className="list-group-item">Donation 3 - Amount: $150</li>
              </ul>
            </div>

            {/* Print Receipt Button */}
            <div>
              <button className="btn btn-primary">Print Receipt</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationPage;
