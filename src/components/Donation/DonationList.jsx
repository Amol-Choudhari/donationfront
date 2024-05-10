import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DonationList = () => {
    const [donation, setUsers] = useState([]);

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = () => {
        // Fetch users from the backend
        const token = sessionStorage.getItem('jwtToken');

        if (token) {
            axios.get('http://localhost:8081/donation/getdonations', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
        } else {
            console.error('Token not found in session storage');
        }
    };

    return (
        <div>
            <h1 className='bg-secondary' style={{color: 'white'}}>Donations</h1>
            <Link to="/donationform" className="btn btn-primary mb-5">Add Donation</Link>
            <table className="table table-bordered table-striped">
                <caption>List of donations</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>By User</th>
                        <th>Transactions</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {donation.map((donation) => (
                        <tr key={donation.id}>
                            <td>{donation.name}</td>
                            <td>{donation.mobile}</td>
                            <td>{donation.amount}</td>
                            <td>{donation.donation_type}</td>
                            <td>{donation.transaction_no}</td>
                            <td>
                                <Link to={`/donation/getdonation/${donation.id}`} className="btn btn-info">Details</Link>
                                <Link to={`/donation/editdonation/${donation.id}`} className="btn btn-secondary">Edit</Link>
                                <button onClick={() => deleteUser(donation.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const deleteUser = (donationId) => {
    axios.delete(`http://localhost:8080/api/donation/deletedonation/${donationId}`)
        .then(() => {
            alert('User deleted successfully');
            // Optionally refresh the list
        })
        .catch(error => {
            console.error('Error deleting the user', error);
            alert('Failed to delete user');
        });
};

export default DonationList;
