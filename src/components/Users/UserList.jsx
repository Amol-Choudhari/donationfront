import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableColumns from '../NewElements/DataTableColumns'; // Import the columns


// Custom styles for the DataTable
const customStyles = {
    table: {
        style: {
            border: '1px solid #dee2e6', // Add border around the table
        },
    },
    headCells: {
        style: {
            backgroundColor: '#343a40', // Dark gray background for header
            color: 'white', // White text for header
            fontWeight: 'bold', // Bold font for header
            fontSize: '16px', // Increase header font size
            borderBottom: '2px solid #dee2e6', // Bottom border for header
        },
    },
    rows: {
        style: {
            borderBottom: '1px solid #dee2e6', // Bottom border for rows
            fontSize: '14px', // Standard font size for rows
        },
        highlightOnHoverStyle: {
            backgroundColor: '#f1f3f5', // Light gray when hovering over rows
            cursor: 'pointer',
        },
    },
    pagination: {
        style: {
            borderTop: '1px solid #dee2e6', // Border on top of pagination
            padding: '10px', // Padding around pagination controls
        },
    },
};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            axios.get('http://localhost:8081/user/getusers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
        } else {
            console.error('Token not found in session storage');
            setLoading(false);
        }
    };

    const deleteUser = (userId) => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            axios.delete(`http://localhost:8081/user/delete/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                alert('User deleted successfully');
                // Update the list of users after deletion
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => {
                console.error('Error deleting the user', error);
                alert('Failed to delete user');
            });
        } else {
            console.error('Token not found in session storage');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="bg-secondary text-white rounded">User Management</h1>
            <Link to="/userform" className="btn btn-primary mb-4">Add New User</Link>
            <DataTable
                title="List of Registered Users"
                columns={DataTableColumns({ deleteUser })} // Pass deleteUser as a prop
                data={users}
                progressPending={loading}
                pagination
                highlightOnHover
                striped
                customStyles={customStyles} // Apply custom styles
            />
        </div>
    );
};

export default UserList;
