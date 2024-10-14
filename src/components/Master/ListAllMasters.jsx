import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import masterTypeConfig from '../../config/masterTypeConfig';

const ListAllMasters = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const masterType = location.state?.masterType || 'Master';

    const token = sessionStorage.getItem('jwtToken');
    const [masterData, setMasterData] = useState([]);

    useEffect(() => {
 
        const fetchMasterData = async () => {
            const config = masterTypeConfig[masterType.toLowerCase()];
            if (!config) {
                console.error('Invalid master type:', masterType.toLowerCase());
                return;
            }

            try {
                const response = await axios.get(config.apiEndpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMasterData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(`Error fetching values:`, error); // Log the entire error object
            }
        };
    
        fetchMasterData();
    }, [masterType, token]);
    

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page in history
    };

    const displayNameField = masterTypeConfig[masterType]?.fields[0] || 'name';
    console.log('Master Type:', masterType); // Should output 'donation type'
    

    return (
        <div className="container-fluid pt-4">  
            <NavBar />
            <div className="row">
                <div className="col-lg-3">
                    <SideBar />
                </div>
                <div className="col-lg-9" style={{ marginTop: '58px' }}>
                    <div className="container">
                        <h2 className="mt-3 mb-4">List of {masterTypeConfig[masterType]?.displayName || 'Masters'}</h2>
                        <MDBBtn className='mb-2'>
                            <Link 
                                to="/add-master" 
                                className="nav-link" 
                                style={{ color: 'inherit', textDecoration: 'none' }}
                                state={{ masterType }} 
                            >
                                Add New
                            </Link>
                        </MDBBtn>
                        <MDBBtn className='mb-2 float-right' onClick={handleBack}>
                            Back
                        </MDBBtn>

                        <MDBTable align='middle' bordered hover small>
                            <caption>List of {masterTypeConfig[masterType]?.displayName || 'Masters'}</caption>
                            <MDBTableHead dark>
                                <tr>
                                    <th scope='col'>Sr. No</th>
                                    <th scope='col'>{masterTypeConfig[masterType]?.displayName}</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Created</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {masterData.map((item, index) => {
                                    const formattedDate = new Date(item.created).toLocaleDateString('en-GB');

                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item[displayNameField]}</td>
                                            <td>
                                                <MDBBadge color={item.status === 'Y' ? 'success' : 'danger'} pill>
                                                    {item.status === 'Y' ? 'Active' : 'Inactive'}
                                                </MDBBadge>
                                            </td>
                                            <td>{formattedDate}</td>
                                            <td>
                                                <MDBBtn color='link' rounded size='sm'>
                                                    Edit
                                                </MDBBtn>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListAllMasters;
