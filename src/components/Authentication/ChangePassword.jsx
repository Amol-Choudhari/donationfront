import React, { useState } from 'react';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './ChangePasswordForm.css'; // Custom styles file

const API_BASE_URL = 'http://localhost:8081';

const ChangePasswordForm = () => {
    const token = sessionStorage.getItem('jwtToken');
    const [formError, setFormError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validation schema for passwords
    const PasswordSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string()
            .required('New password is required')
            .min(6, 'Password must be at least 6 characters long'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Please confirm your new password')
    });

    const handleSubmit = async (values, { resetForm }) => {
        setIsLoading(true);
        setFormError(null);

        try {
            const response = await axios.put(`${API_BASE_URL}/user/changepassword`, {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data === true) {
                alert('Password updated successfully');
                resetForm();
            } else {
                setFormError('Password update failed. Please try again.');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setFormError('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid pt-4">
            <NavBar />
            <div className="row">
                <div className="col-lg-3">
                    <SideBar />
                </div>
                <div className="col-lg-9 mt-5 ml-5">
                    <div className="container d-flex justify-content-center">
                        <div className="card shadow custom-card" style={{ maxWidth: '600px', width: '100%' }}>
                            <div className="card-body">
                                <h4 className="card-title text-center mb-4">Change Password</h4>
                                <Formik
                                    initialValues={{
                                        currentPassword: '',
                                        newPassword: '',
                                        confirmPassword: ''
                                    }}
                                    validationSchema={PasswordSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="mb-3 position-relative">
                                                <label htmlFor="currentPassword" className="form-label">
                                                    Current Password
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        type={showCurrentPassword ? 'text' : 'password'}
                                                        name="currentPassword"
                                                        className="form-control"
                                                        placeholder="Enter current password"
                                                    />
                                                    <span
                                                        className="input-group-text cursor-pointer"
                                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    >
                                                        <i className={`fa ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                    </span>
                                                </div>
                                                <ErrorMessage name="currentPassword" component="div" className="text-danger" />
                                            </div>

                                            <div className="mb-3 position-relative">
                                                <label htmlFor="newPassword" className="form-label">
                                                    New Password
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        type={showNewPassword ? 'text' : 'password'}
                                                        name="newPassword"
                                                        className="form-control"
                                                        placeholder="Enter new password"
                                                    />
                                                    <span
                                                        className="input-group-text cursor-pointer"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                    >
                                                        <i className={`fa ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                    </span>
                                                </div>
                                                <ErrorMessage name="newPassword" component="div" className="text-danger" />
                                            </div>

                                            <div className="mb-3 position-relative">
                                                <label htmlFor="confirmPassword" className="form-label">
                                                    Confirm New Password
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        name="confirmPassword"
                                                        className="form-control"
                                                        placeholder="Confirm new password"
                                                    />
                                                    <span
                                                        className="input-group-text cursor-pointer"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    >
                                                        <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                    </span>
                                                </div>
                                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-primary w-100"
                                                disabled={isLoading || isSubmitting}
                                                style={{ padding: '10px 0', fontSize: '16px' }}
                                            >
                                                {isLoading ? 'Updating...' : 'Update Password'}
                                            </button>

                                            {formError && (
                                                <div className="alert alert-danger mt-3 text-center">
                                                    {formError}
                                                </div>
                                            )}
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
