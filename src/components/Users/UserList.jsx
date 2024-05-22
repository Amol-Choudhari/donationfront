import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        // Fetch users from the backend
        const token = sessionStorage.getItem('jwtToken');

        if (token) {
            axios.get('http://localhost:8081/user/getusers', {
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
            <h1 className='bg-secondary' style={{color: 'white'}}>Users</h1>
            <Link to="/userform" className="btn btn-primary mb-5">Add New User</Link>
            <table className="table table-bordered table-striped">
                <caption>List of registered users</caption>
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
                                <Link to={`/userform/${user.id}`} className="btn btn-secondary">Edit</Link>
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
