import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDetails = ({ match }) => {
    const [user, setUser] = useState(null);
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
            <h2>User Details</h2>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Title:</strong> {user.title}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Status:</strong> {user.status}</p>
                    <p><strong>Position:</strong> {user.position}</p>
                    <div>
                        <Link to={`/users/edit/${user.id}`} className="btn btn-primary">Edit</Link>
                        <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
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
