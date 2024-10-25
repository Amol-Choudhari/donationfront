import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import axios from 'axios';

const AddMaster = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const masterType = location.state?.masterType || 'Master';

    const token = sessionStorage.getItem('jwtToken');

    const [formData, setFormData] = useState({
        name: '',
        status: 'Y',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const getEndpoint = (type) => {
        switch (type.toLowerCase()) {
            case 'donation type':
                return 'http://localhost:8081/master/donationtype/addnew';
            case 'gender':
                return 'http://localhost:8081/master/gender/add';
            case 'roles':
                return 'http://localhost:8081/master/roles/add';
            default:
                return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setErrorMessage('User is not authenticated. Please log in.');
            return;
        }

        const endpoint = getEndpoint(masterType);

        if (!endpoint) {
            setErrorMessage(`Invalid master type: ${masterType}`);
            return;
        }

        try {
            await axios.post(endpoint, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            navigate('/list-all-masters', { state: { masterType } });
        } catch (error) {
            console.error(`Error adding ${masterType.toLowerCase()}:`, error);
            setErrorMessage(`Error adding ${masterType}. Please try again later.`);
        }
    };

    return (
        <div className="container-fluid pt-4">
            <NavBar />
            <div className="row">
                <div className="col-lg-3">
                    <SideBar />
                </div>
                <div className="col-lg-9" style={{ marginTop: '58px' }}>
                    <div className="container">
                        <h2 className="mt-3 mb-4">Add New {masterType}</h2>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="name" className="form-label">{masterType} Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Y">Active</option>
                                        <option value="N">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary mt-3">Add {masterType}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMaster;
