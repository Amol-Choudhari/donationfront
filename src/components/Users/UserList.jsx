import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        // Get the token from the session storage
        const token = sessionStorage.getItem('jwtToken');

        // If the token exists, include it in the request headers
        if (token) {
        axios.get('http://localhost:8081/user/getusers', {
            headers: {
            Authorization: `Bearer ${token}` // Assuming your backend expects a Bearer token
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

   // if (loading) return <p>Loading...</p>;
   //ß if (error) return <p>{error}</p>;

    return (
        <div>
            <h1 className='bg-secondary' style={{color: 'white'}}>Users</h1>
            <Link to="/users/userform" className="btn btn-primary mb-5">Add New User</Link>
            <table className="table table-bordered table-striped">
                <caption>List of regisered users</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.title}</td>
                            <td>
                                <Link to={`/users/${user.id}`} className="btn btn-info">Details</Link>
                                <Link to={`/users/edit/${user.id}`} className="btn btn-secondary">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const deleteUser = (userId) => {
    axios.delete(`http://localhost:8080/api/users/${userId}`)
        .then(() => {
            alert('User deleted successfully');
            // Optionally refresh the list
        })
        .catch(error => {
            console.error('Error deleting the user', error);
            alert('Failed to delete user');
        });
};

export default UserList;
