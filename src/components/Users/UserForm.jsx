import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ userId, refreshUsers }) => {
  const [user, setUser] = useState({
    name: '',
    mobile: '',
    age: '',
    gender: '',
    email: '',
    username: '',
    password: ''
  });

  // Load user details if userId is provided (for edit mode)
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/api/users/getuser/${userId}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Error loading the user details', error));
    }
  }, [userId]);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle form submission (for both create and update)
  const handleSubmit = (event) => {
    event.preventDefault();
    const method = userId ? 'put' : 'post';
    const url = userId ? `http://localhost:8080/api/users/getuser/${userId}` : 'http://localhost:8080/api/users/adduser';

    axios[method](url, ß)
      .then(() => {
        refreshUsers();
      })
      .catch(error => console.error('Error saving the user', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="mobile" value={user.mobile} onChange={handleChange} placeholder="Mobile" required />
      <input type="text" name="age" value={user.age} onChange={handleChange} placeholder="Age" required />
      <input type="text" name="gender" value={user.gender} onChange={handleChange} placeholder="Gender" required />
      <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">{userId ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default UserForm;
