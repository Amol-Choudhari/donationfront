import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import DonationList from '../Donation/DonationList';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonationPage = () => {
    const [donations, setDonations] = useState([]);
    const [donationTypes, setDonationTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDonations();
        fetchDonationTypes();
    }, []);

    const fetchDonations = () => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            axios.get('http://localhost:8081/donation/getdonations', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setDonations(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching donations:', error);
                setLoading(false);
            });
        } else {
            console.error('Token not found in session storage');
            setLoading(false);
        }
    };

    const fetchDonationTypes = () => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            axios.get('http://localhost:8081/master/donationtype/fetchall', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setDonationTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching donation types:', error);
            });
        } else {
            console.error('Token not found in session storage');
        }
    };

    const deleteDonation = (donationId) => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            axios.delete(`http://localhost:8081/donation/deletedonation/${donationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                alert('Donation deleted successfully');
                fetchDonations(); // Refresh list after deletion
            })
            .catch(error => {
                console.error('Error deleting the donation:', error);
                alert('Failed to delete donation');
            });
        } else {
            console.error('Token not found in session storage');
        }
    };

    return (
        <div className="container-fluid pt-4">  
            <NavBar />
            <div className="row">
                <div className="col-lg-3">
                    <SideBar />
                </div>
                <div className="col-lg-9" style={{ marginTop: '58px' }}>
                    <div className="container">
                        <DonationList 
                            donations={donations} 
                            donationTypes={donationTypes}
                            deleteDonation={deleteDonation} 
                            loading={loading} 
                        /> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationPage;
