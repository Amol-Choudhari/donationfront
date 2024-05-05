import React, { useState, useEffect } from 'react';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import { Link } from 'react-router-dom';
import UserList from '../Users/UserList'; // Corrected import statement
import UserDetails from '../Users/UserDetails';
import UserForm from '../Users/UserForm';
import axios from 'axios'; 

const ManageUsers = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);


  // Fetch users from the backend when the component mounts
  useEffect(() => {
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
  }, []);


  return (
    <div className="container-fluid pt-4">  
      <NavBar />
      <div className="row">
        <div className="col-lg-3">
          <SideBar />
        </div>
        <div className="col-lg-9" style={{ paddingTop: '70px' }}> {/* Increase padding-top to push content below NavBar */}
          <div className="container">
            <UserList users={users} deleteUser={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
