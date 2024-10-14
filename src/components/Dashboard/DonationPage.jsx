import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import { useForm } from 'react-hook-form'; // Example using react-hook-form
import DonationList from '../Donation/DonationList'; // Import DonationList component
import React, { useState, useEffect } from 'react';

const DonationPage = () => {

    const [donation, setDonation] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        // Fetch donation data from your backend API
        fetchDonations();
    }, []);
        
    const fetchDonations = async () => {
        let fetchedDonationData; // Declare a variable to hold fetched data
        try {
            // Make your API call using fetch or axios
            const response = await fetch('http://your-api-endpoint');
            fetchedDonationData = await response.json(); // Parse the response

            // Update the donation state with fetched data
            setDonation(fetchedDonationData);
        } catch (error) {
            console.error('Error fetching donations:', error);
            // Handle errors appropriately (e.g., display error message to user)
        }
    };
  
    


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
                        <DonationList donation={donation} deleteUser={selectedUser} />  {/* Pass props to DonationList */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DonationPage;
