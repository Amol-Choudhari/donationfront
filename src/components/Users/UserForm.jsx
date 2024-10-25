// src/components/UserForm.js

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

// API base URL configuration
const API_BASE_URL = 'http://localhost:8081';

const UserForm = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const token = sessionStorage.getItem('jwtToken');
    
    const [user, setUser] = useState({
        name: '',
        mobile: '',
        age: '',
        gender: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        roles: []
    });

    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const [availableRoles, setAvailableRoles] = useState([]);

    // Fetch available roles with proper error handling
    const fetchRoles = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/master/roles/fetchall`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAvailableRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    }, [token]);

    // Load user details if `userId` is present
    useEffect(() => {
        const loadUserDetails = async () => {
            if (userId) {
                setIsLoading(true);
                try {
                    const response = await axios.get(`${API_BASE_URL}/user/getuser/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error loading user details', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        loadUserDetails();
    }, [userId, token]);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    // Yup validation schema with custom error messages
    const UserSchema = Yup.object().shape({
        name: Yup.string().required('Please enter your name'),
        mobile: Yup.string()
            .matches(/^\d+$/, 'Mobile number must contain only digits')
            .required('Please provide your mobile number'),
        age: Yup.number()
            .required('Age is required')
            .positive('Age must be a positive number')
            .integer('Age must be a whole number'),
        gender: Yup.string().required('Please select your gender'),
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Email is required'),
        username: Yup.string().required('Username is mandatory'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters long'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords do not match')
            .required('Please confirm your password'),
        roles: Yup.array().min(1, 'Please select at least one role')
    });

    // Handle form submission with API interaction
    const handleSubmit = async (values) => {
        setIsLoading(true);
        setFormError(null);
        try {
            const method = userId ? 'put' : 'post';
            const url = userId ? `${API_BASE_URL}/user/edituser/${userId}` : `${API_BASE_URL}/user/adduser`;
            const payload = {
                ...values,
                roles: values.roles.map(roleId => ({
                    id: roleId,
                    name: availableRoles.find(r => r.id === roleId)?.name
                }))
            };

            const response = await axios[method](url, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data === true) {
                alert(userId ? 'User details updated successfully' : 'New user added successfully');
                navigate('/users');
            } else {
                setFormError('User not added/updated. Please try again');
            }
        } catch (error) {
            setFormError('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid pt-4">
            <NavBar />
            <div className="row">
                <div className="col-lg-3"><SideBar /></div>
                <div className="col-lg-6" style={{ paddingTop: '90px' }}>
                    <div className="container border border-primary rounded" style={{ padding: '30px' }}>
                        <h3>{userId ? 'Edit User Form' : 'Add User Form'}</h3>

                        <Formik
                            initialValues={user}
                            validationSchema={UserSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize={true}
                            validateOnChange={true}
                        >
                            {({ values, isSubmitting }) => (
                                <Form>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <label htmlFor="name">Name</label>
                                            <Field name="name" className="form-control border" placeholder="Enter Name" />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="username">Username</label>
                                            <Field name="username" className="form-control border" placeholder="Enter Username" />
                                            <ErrorMessage name="username" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col">
                                            <label htmlFor="email">Email</label>
                                            <Field type="email" name="email" className="form-control border" placeholder="Enter Email" />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="mobile">Mobile</label>
                                            <Field name="mobile" className="form-control border" placeholder="Enter Mobile" />
                                            <ErrorMessage name="mobile" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col">
                                            <label htmlFor="gender">Gender</label>
                                            <Field as="select" name="gender" className="form-control border">
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Field>
                                            <ErrorMessage name="gender" component="div" className="text-danger" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="age">Age</label>
                                            <Field name="age" className="form-control border" placeholder="Enter Age" />
                                            <ErrorMessage name="age" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col">
                                            <label htmlFor="password">Password</label>
                                            <Field type="password" name="password" className="form-control border" placeholder="Enter Password" />
                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <Field type="password" name="confirmPassword" className="form-control border" placeholder="Confirm Password" />
                                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col">
                                            <label htmlFor="roles">Roles</label>
                                            <FieldArray name="roles">
                                                {({ remove, push }) => (
                                                    availableRoles.map((role) => {
                                                        const isChecked = values.roles.includes(role.id);

                                                        return (
                                                            <div key={role.id} className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id={`role-${role.id}`}
                                                                    name="roles"
                                                                    value={role.id}
                                                                    checked={isChecked}
                                                                    onChange={() => {
                                                                        if (isChecked) {
                                                                            // Remove if already checked
                                                                            remove(values.roles.indexOf(role.id));
                                                                        } else {
                                                                            // Add if not checked
                                                                            push(role.id);
                                                                        }
                                                                    }}
                                                                />
                                                                <label htmlFor={`role-${role.id}`} className="form-check-label">{role.name}</label>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </FieldArray>
                                            <ErrorMessage name="roles" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    {formError && <div className="text-danger mb-3">{formError}</div>}
                                    <button type="submit" className="btn btn-success mb-4" disabled={isLoading || isSubmitting}>
                                        {isLoading ? 'Saving...' : (userId ? 'Update' : 'Create')}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
