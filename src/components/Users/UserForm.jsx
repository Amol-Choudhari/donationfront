import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import axios from 'axios';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
// Initialization for ES Users
import { Input, Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Input, Ripple });  

const UserForm = ({ refreshUsers }) => {
  
  const params = useParams(); // Use useParams hook
  const userId = params.userId; // Extract userId from params object
  const initialUserState = {
    name: '',
    mobile: '',
    age: '',
    gender: '',
    email: '',
    username: '',
    password: '',
    roles: [] // New state to store selected roles
  };

  const [user, setUser] = useState(initialUserState);

  // Function to reset the form state to initial values
  const resetForm = () => {
    setUser(initialUserState);
  };

  // Get the token from the session storage
  const token = sessionStorage.getItem('jwtToken');

  const [availableRoles, setAvailableRoles] = useState([]);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8081/master/roles/fetchall',{
        headers: {
          Authorization: `Bearer ${token}` // Assuming your backend expects a Bearer token
        }
      });
      setAvailableRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }, [token]);

  useEffect(() => {
    // Fetch available roles from the backend when the component mounts
    fetchRoles();
  }, [fetchRoles]);

  // Load user details if userId is provided (for edit mode)
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8081/user/getuser/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}` // Assuming your backend expects a Bearer token
        }
      })
        .then(response => setUser(response.data))
        .catch(error => console.error('Error loading the user details', error));
    }
  }, [userId,token]);

  // Handle role selection
  const handleRoleChange = (event) => {
    const { value, checked } = event.target;
    const selectedRole = availableRoles.find(role => role.id === parseInt(value));
    setUser(prevState => {
      const updatedRoles = checked
        ? [...prevState.roles, selectedRole]
        : prevState.roles.filter(role => role.id !== parseInt(value));
      return { ...prevState, roles: updatedRoles };
    });
  };

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle form submission (for both create and update)
  const handleSubmit = (event) => {

    
    event.preventDefault();
    const method = userId ? 'put' : 'post';
    const url = userId ? `http://localhost:8081/user/edituser/${userId}` : 'http://localhost:8081/user/adduser';

    // Ensure the JSON payload is correctly structured
    const payload = {
      name: user.name,
      mobile: user.mobile,
      age: user.age,
      gender: user.gender,
      email: user.email,
      username: user.username,
      password: user.password,
      roles: user.roles.map(role => ({ id: role.id, name: role.name }))
    };

    axios[method](url, payload,{
      headers: {
        Authorization: `Bearer ${token}` // Assuming your backend expects a Bearer token
      }
    }) // Pass the user object as data
          .then(response => {
            if(response.data===true){
              if(userId){
                alert("User details updated successfully");
              }else{
                alert("New user added successfully");
              }
              
            }else{
              alert("User not added. Please try again");
            }

            if(!userId){
              // After successful submission, reset the form
              resetForm();
            }
        })
      .catch(error => console.error('Error saving the user', error));
  };

  return (

    <div className="container-fluid pt-4">  
      <NavBar />
      <div className="row">
        <div className="col-lg-3"><SideBar /></div>
        <div className="col-lg-9" style={{ paddingTop: '70px' }}> {/* Increase padding-top to push content below NavBar */}
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init className="form-outline">
                    <input type="text" id="name" className="form-control" name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
                    <label className="form-label" htmlFor="name">Name</label>
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init className="form-outline">
                    <input type="text" id="username" className="form-control" name="username" value={user.username} onChange={handleChange} placeholder="Username" required />
                    <label className="form-label" htmlFor="username">Username</label>
                  </div>
                </div>

              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="email" id="email" className="form-control" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
                    <label className="form-label" htmlFor="email">Email address</label>
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="tel" id="mobile" className="form-control" name="mobile" value={user.mobile} onChange={handleChange} placeholder="Mobile" required />
                    <label className="form-label" htmlFor="mobile">Mobile</label>
                  </div>
                </div>
              </div>
            
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init className="form-outline mb-4">
                    
                  <input type="text" id="gender" className="form-control" name="gender" value={user.gender} onChange={handleChange} placeholder="Gender" required />
                  <label className="form-label" htmlFor="age">Gender</label>
              </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="text" id="age" className="form-control" name="age" value={user.age} onChange={handleChange} placeholder="Age" required />
                    <label className="form-label" htmlFor="age">Age</label>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                  <div className="col">
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password" id="password" className="form-control" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
                        <label className="form-label" for="password">Password</label>
                      </div>
                  </div>
                  <div className="col">
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password" id="confirmpassword" className="form-control" name="confirmpassword" value={user.confirmpassword} onChange={handleChange} placeholder="Confirm Password" required />
                        <label className="form-label" for="password">Confirm Password</label>
                      </div>
                  </div>
                </div>

                <div className="row mb-4">
                <div className="col">
                    <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label">Roles</label>
                    {availableRoles.map(role => (
                      <div key={role.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={role.id}
                          id={`role-${role.id}`}
                          checked={user.roles.some(r => r.id === role.id)}
                          onChange={handleRoleChange}
                        />
                        <label className="form-check-label" htmlFor={`role-${role.id}`}>
                          {role.name}
                        </label>
                      </div>
                    ))}
                    </div>
                </div>
                <div className="col"></div>
              </div>
      
                <div className="container">
                  <div className='col-md-2'>
                    <button type="submit" className="btn btn-primary btn-block mb-4">{userId ? 'Update' : 'Create'}</button>
                  </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  </div>
   
  );
};

export default UserForm;
