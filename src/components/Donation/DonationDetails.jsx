import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DonationDetails = ({ match }) => {
    const [donation, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        axios.get(`http://localhost:8080/api/users/${match.params.userId}`)
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user details', error);
                setError('Failed to load user details');
                setLoading(false);
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Donation Details</h2>
            {donation ? (
                <div>
                    <p><strong>Name:</strong> {donation.name}</p>
                    <p><strong>Mobile:</strong> {donation.title}</p>
                    <p><strong>Donation Type:</strong> {donation.email}</p>
                    <p><strong>Amount:</strong> {donation.status}</p>
                    <p><strong>Transaction ID:</strong> {donation.position}</p>
                    <p><strong>Date:</strong> {donation.position}</p>

                    <div>
                        <Link to={`/users/edit/${donation.id}`} className="btn btn-primary">Edit</Link>
                        <button onClick={() => deleteUser(donation.id)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            ) : <p>User not found.</p>}
        </div>
    );
};

const deleteUser = (userId) => {
    axios.delete(`http://localhost:8080/api/users/${userId}`)
        .then(() => {
            alert('User deleted successfully!');
            // Redirect or update UI accordingly
        })
        .catch(error => {
            console.error('Error deleting the user', error);
            alert('Failed to delete user');
        });
};

export default UserDetails;
