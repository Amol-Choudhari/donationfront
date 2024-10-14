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
        donation_type: '',
        status: 'Y',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // Corrected to use `e.target.name`
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let endpoint = '';

        switch (masterType.toLowerCase()) {
            case 'donation type':
                endpoint = 'http://localhost:8081/master/donationtype/addnew';
                break;
            case 'gender':
                endpoint = 'http://localhost:8081/master/gender/add';
                break;
            case 'roles':
                endpoint = 'http://localhost:8081/master/roles/add';
                break;
            default:
                console.error('Invalid master type');
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
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="donation_type" className="form-label">Donation Type</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="donation_type" 
                                        name="donation_type" 
                                        value={formData.donation_type} 
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
}

export default AddMaster;
