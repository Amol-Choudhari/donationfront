import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
// Initialization for ES Users
import { Input, Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Input, Ripple });  

const DonationForm = ({ donationId, refreshUsers }) => {
  const [donation, setUser] = useState({
    name: '',
    mobile: 0,
    address: '  ',
    amount: '',
    donation_type: '',
    by_user: '',
    transaction_no: ''
  });

  // Load user details if userId is provided (for edit mode)
  useEffect(() => {
    if (donationId) {
      axios.get(`http://localhost:8080/api/donation/getdonations/${donationId}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Error loading the user details', error));
    }
  }, [donationId]);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle form submission (for both create and update)
  const handleSubmit = (event) => {

    // Get the token from the session storage
    const token = sessionStorage.getItem('jwtToken');
    event.preventDefault();
    const method = donationId ? 'put' : 'post';
    const url = donationId ? `http://localhost:8081/donation/getdonation/${donationId}` : 'http://localhost:8081/donation/getdonations';

    axios[method](url, donation,{
      headers: {
        Authorization: `Bearer ${token}` // Assuming your backend expects a Bearer token
      }
    }) // Pass the user object as data
          .then(() => {
        refreshUsers();
      })
      .catch(error => console.error('Error saving the user', error));
  };

  return (

    <div className="container-fluid pt-4">  
      <NavBar />
      <div className="row">
        <div className="col-lg-3"><SideBar /></div>
        <div className="col-lg-9" style={{ paddingTop: '70px' }}> {/* Increase padding-top to push content below NavBar */}
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init className="form-outline">
                    <input type="text" id="name" className="form-control" name="name" value={donation.name} onChange={handleChange} placeholder="Name" required />
                    <label className="form-label" htmlFor="name">Name</label>
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="tel" id="mobile" className="form-control" name="mobile" value={donation.mobile} onChange={handleChange} placeholder="Mobile" required />
                    <label className="form-label" htmlFor="mobile">Mobile</label>
                  </div>
                </div>

              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="amount" id="amount" className="form-control" name="amount" value={donation.amount} onChange={handleChange} placeholder="amount" required />
                    <label className="form-label" htmlFor="amount">Amount</label>
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="text" id="donation_type" className="form-control" name="donation_type" value={donation.donation_type} onChange={handleChange} placeholder="donation_type" required />
                    <label className="form-label" htmlFor="age">Donation Type</label>
                    </div>
                </div>
              </div>
            
              <div className="row mb-4">
                <div className="col-md-4">
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="text" id="transaction_no" className="form-control" name="transaction_no" value={donation.transaction_no} onChange={handleChange} placeholder="transaction no" required />
                    <label className="form-label" htmlFor="age">Transaction Number</label>
                  </div>
                </div>
              </div>

            
      
                <div className="container">
                  <div className='col-md-1'>
                    <button type="submit" className="btn btn-primary btn-block mb-4">{donationId ? 'Update' : 'Add'}</button>
                  </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  </div>
   
  );
};

export default DonationForm;
