import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import axios from 'axios';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
// Initialization for ES Users
//import { Input, Ripple, initMDB } from "mdb-ui-kit";

import 'bootstrap/dist/css/bootstrap.min.css'; 
//import $ from 'jquery'; 
//import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';

//initMDB({ Input, Ripple });  

const DonationForm = () => {
  
  const params = useParams(); // Use useParams hook
  const donationId = params.donationId; // Extract userId from params object
  const initialDonationState = {
    name: '',
    mobile: '',
    address: '',
    amount: '',
    donation_type: '',
  };

  const [donation, setDonation] = useState(initialDonationState);

  // Function to reset the form state to initial values
  const resetForm = () => {
    setDonation(initialDonationState);
  };

  // Get the token from the session storage
  const token = sessionStorage.getItem('jwtToken');

  const [DonationTypes, setDonationTypes] = useState([]);

  const fetchDonationTypes = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8081/master/donationtype/fetchall',{
        headers: {
          Authorization: `Bearer ${token}` // Assuming your backend expects a Bearer token
        }
      });
      setDonationTypes(response.data);
    } catch (error) {
      console.error('Error fetching donation type:', error);
    }
  }, [token]);

  useEffect(() => {
    // Fetch available donation types from the backend when the component mounts
    fetchDonationTypes();
  }, [fetchDonationTypes]);

  // Load donation details if userId is provided (for edit mode)
  useEffect(() => {
    if (donationId) {
      axios.get(`http://localhost:8081/donation/getdonation/${donationId}`,{
        headers: {
          Authorization: `Bearer ${token}` // Assuming your backend expects a Bearer token
        }
      })
        .then(response => setDonation(response.data))
        .catch(error => console.error('Error loading the donation details', error));
    }
  }, [donationId,token]);

  // Handle donation selection
  const handleDonationTypeChange = (event) => {
    const { value, checked } = event.target;
    const selectedDonationTypes = DonationTypes.find(donation => donation.id === parseInt(value));
    setDonation(prevState => {
      const updatedDonationTypes = checked
        ? [...prevState.donation_type, selectedDonationTypes]
        : prevState.donation_type.filter(donation => donation.id !== parseInt(value));
      return { ...prevState, donation_type: updatedDonationTypes };
    });
  };

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDonation(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle form submission (for both create and update)
  const handleSubmit = (event) => {
    event.preventDefault();

    if (donation.donation_type.length === 0) {
      alert('Please select at least one donation type.');
      return;
    }

    const method = donationId ? 'put' : 'post';
    const url = donationId ? `http://localhost:8081/donation/editdonation/${donationId}` : 'http://localhost:8081/donation/adddonation';

    // Ensure the JSON payload is correctly structured
    const payload = {
      name: donation.name,
      mobile: donation.mobile,
      address: donation.address,
      amount: donation.amount,
      donation_type: donation.donation_type,
    };

    axios[method](url, payload,{
      headers: {
        Authorization: `Bearer ${token}` // Assuming your backend expects a Bearer token
      }
    }) // Pass the user object as data
          .then(response => {
            if(response.data===true){
              if(donationId){
                alert("Donation details updated successfully");
              }else{
                alert("New Donation added successfully");
              }
              
            }else{
              alert("Donation not added. Please try again");
            }

            if(!donationId){
              // After successful submission, reset the form
              resetForm();
            }
        })
      .catch(error => console.error('Error saving the donation', error));
  };

  var title = "Add Donation Form";
  if(donationId){
    title = "Edit Donation Form";
  }

  return (

    <div className="container-fluid pt-4">  
      <NavBar />
      <div className="row">
        <div className="col-lg-3"><SideBar /></div>
        <div className="col-lg-6" style={{ paddingTop: '90px' }}> {/* Increase padding-top to push content below NavBar */}
          <div className="container border border-primary rounded" style={{ padding: '30px' }}>
            <h3>{title}</h3>
            <form onSubmit={handleSubmit}>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                  <label className="form-label" htmlFor="name">Name</label>
                    <input type="text" id="name" className="form-control border" name="name" value={donation.name} onChange={handleChange} placeholder="Enter Name" required />
                    
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="mobile">Mobile</label>
                    <input type="tel" id="mobile" className="form-control border" name="mobile" value={donation.mobile} onChange={handleChange} placeholder="Enter Mobile No." required />
                    
                  </div>
                </div>
              </div>
            
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="address">Address</label>
                  <input type="text" id="address" className="form-control border" name="address" value={donation.address} onChange={handleChange} placeholder="Enter Address" required />           
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="amount">Amount</label>
                    <input type="text" id="amount" className="form-control border" name="amount" value={donation.amount} onChange={handleChange} placeholder="Enter Amount" required />                 
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col">
                    <div className="form-outline mb-4">
                    <label className="form-label">Donation Type</label>
                    {DonationTypes.map(donation => (
                      <div key={donation.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={donation.id}
                          id={`donation-${donation.id}`}
                          checked={donation.donation_type.some(d => d.id === donation.id)}
                          onChange={handleDonationTypeChange}
                        />
                        <label className="form-check-label" htmlFor={`donation-${donation.id}`}>
                          {donation.type}
                        </label>
                      </div>
                    ))}
                    </div>
                </div>
                <div className="col"></div>
              </div>
      
                <div className="container">
                  <div className='col-md-2'>
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
