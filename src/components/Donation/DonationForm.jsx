import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';

const DonationForm = () => {
    const params = useParams();
    const donationId = params.donationId;

    const initialDonationState = {
        name: '',
        mobile: '',
        address: '',
        amount: '',
        donation_type: '',
    };

    const [donation, setDonation] = useState(initialDonationState);
    const navigate = useNavigate();
    const [donationConfirmed, setDonationConfirmed] = useState(null);
    const [DonationTypes, setDonationTypes] = useState([]);

    // Get the token from session storage
    const token = sessionStorage.getItem('jwtToken');

    // Fetch available donation types from the backend
    const fetchDonationTypes = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8081/master/donationtype/fetchall', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDonationTypes(response.data);
        } catch (error) {
            console.error('Error fetching donation types:', error);
        }
    }, [token]);

    useEffect(() => {
        fetchDonationTypes();
    }, [fetchDonationTypes]);

    // Load donation details if donationId is provided (for edit mode)
    useEffect(() => {
        if (donationId) {
            axios.get(`http://localhost:8081/donation/getdonation/${donationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setDonation(response.data);
                if (response.data.confirmation === "yes") {
                    setDonationConfirmed(response.data.confirmation);
                }
            })
            .catch(error => console.error('Error loading the donation details', error));
        }
    }, [donationId, token]);

    // Handle donation type change
    const handleDonationTypeChange = (event) => {
        const { value } = event.target;
        const selectedDonationType = DonationTypes.find(donationtype => donationtype.id === parseInt(value));
        if (selectedDonationType) {
            setDonation(prevState => ({ ...prevState, donation_type: selectedDonationType }));
        }
    };

    // Handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDonation(prevState => ({ ...prevState, [name]: value }));
    };

    // Handle form submission (for both create and update)
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!donation.donation_type || !donation.donation_type.id) {
            alert('Please select a donation type.');
            return;
        }

        const method = donationId ? 'put' : 'post';
        const url = donationId ? `http://localhost:8081/donation/confirmdonation/${donationId}` : 'http://localhost:8081/donation/adddonation';

        const payload = {
            name: donation.name,
            mobile: donation.mobile,
            address: donation.address,
            amount: donation.amount,
            donation_type: donation.donation_type.id,
        };

        axios[method](url, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.lastDonaId != null) {
                if (donationId) {
                    alert("Donation details Confirmed successfully");
                    navigate(`/donationform/${donationId}`);
                } else {
                    alert("New Donation added successfully");
                    navigate(`/donationform/${response.data.lastDonaId}`);
                }
            } else {
                alert("Donation not added. Please try again.");
            }
        })
        .catch(error => console.error('Error saving the donation', error));
    };

    const title = donationId ? "Edit Donation Form" : "Add Donation Form";

    return (
        <div className="container-fluid pt-4">  
            <NavBar />
            <div className="row">
                <div className="col-lg-3"><SideBar /></div>
                <div className="col-lg-6" style={{ paddingTop: '90px' }}>
                    <div className="container border border-primary rounded" style={{ padding: '30px' }}>
                        <h3>{title}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="name">Name</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            className="form-control border" 
                                            name="name" 
                                            value={donation.name} 
                                            onChange={handleChange} 
                                            placeholder="Enter Name" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="mobile">Mobile</label>
                                        <input 
                                            type="tel" 
                                            id="mobile" 
                                            className="form-control border"
                                            name="mobile"
                                            value={donation.mobile}
                                            onChange={handleChange}
                                            placeholder="Enter Mobile No."
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="address">Address</label>
                                        <input 
                                            type="text" 
                                            id="address" 
                                            className="form-control border" 
                                            name="address" 
                                            value={donation.address} 
                                            onChange={handleChange} 
                                            placeholder="Enter Address" 
                                            required    
                                        />           
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="amount">Amount</label>
                                        <input 
                                            type="text" 
                                            id="amount" 
                                            className="form-control border" 
                                            name="amount" 
                                            value={donation.amount} 
                                            onChange={handleChange} 
                                            placeholder="Enter Amount" 
                                            required 
                                        />                 
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="donationtype">Donation Type</label>
                                        {DonationTypes.map(donationtype => (
                                            <div key={donationtype.id} className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    value={donationtype.id}
                                                    id={`donationtype-${donationtype.id}`}
                                                    checked={donation.donation_type && donationtype.id === donation.donation_type.id}
                                                    onChange={handleDonationTypeChange}
                                                />
                                                <label className="form-check-label" htmlFor={`donationtype-${donationtype.id}`}>
                                                    {donationtype.donation_type}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col"></div>
                            </div>
                
                            <div className="container">
                                <div className="col-md-4">
                                    {donationConfirmed === "yes" ? (
                                        <button type="submit" className="btn btn-primary btn-block mb-4">
                                            Print Receipt
                                        </button>
                                    ) : (
                                        <button type="submit" className="btn btn-primary btn-block mb-4">
                                            {donationId ? 'Confirm Donation' : 'Add Donation'}
                                        </button>
                                    )}
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
