import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDetails = ({ match }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const history = useHistory(); // useHistory to navigate programmatically

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

    const deleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axios.delete(`http://localhost:8080/api/users/${userId}`)
                .then(() => {
                    alert('User deleted successfully!');
                    history.push('/users'); // Redirect to user list after deletion
                })
                .catch(error => {
                    console.error('Error deleting the user', error);
                    alert('Failed to delete user');
                });
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>;
    if (error) return <div className="alert alert-danger mt-3">{error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">User Details</h2>
            {user ? (
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        {user.name}
                    </div>
                    <div className="card-body">
                        <p><strong>Title:</strong> {user.title}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Status:</strong> {user.status}</p>
                        <p><strong>Position:</strong> {user.position}</p>
                        <div className="mt-4">
                            <Link to={`/users/edit/${user.id}`} className="btn btn-primary mr-2">Edit</Link>
                            <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="alert alert-warning">User not found.</div>
            )}
        </div>
    );
};

export default UserDetails;
