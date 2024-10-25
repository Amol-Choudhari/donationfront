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
    const [error, setError] = useState(''); // State to store any errors

    useEffect(() => {
        const fetchMasterData = async () => {
            const config = masterTypeConfig[masterType.toLowerCase()];

            if (!config) {
                setError(`Invalid master type: ${masterType}`);
                return;
            }

            try {
                const response = await axios.get(config.apiEndpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMasterData(response.data);
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
                console.error('Error fetching values:', err);
            }
        };

        fetchMasterData();
    }, [masterType, token]);

    const handleBack = () => {
        navigate(-1);
    };

    const displayNameField = masterTypeConfig[masterType.toLowerCase()]?.fields?.[0] || 'name';

    return (
        <div className="container-fluid pt-4">
            <NavBar />
            <div className="row">
                <div className="col-lg-3">
                    <SideBar />
                </div>
                <div className="col-lg-9" style={{ marginTop: '58px' }}>
                    <div className="container">
                        <h2 className="mt-3 mb-4">
                            List of {masterTypeConfig[masterType.toLowerCase()]?.displayName || 'Masters'}
                        </h2>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <MDBBtn className="mb-2">
                            <Link
                                to="/add-master"
                                className="nav-link"
                                style={{ color: 'inherit', textDecoration: 'none' }}
                                state={{ masterType }}
                            >
                                Add New
                            </Link>
                        </MDBBtn>
                        <MDBBtn className="mb-2 float-right" onClick={handleBack}>
                            Back
                        </MDBBtn>

                        <MDBTable align="middle" bordered hover small>
                            <caption>
                                List of {masterTypeConfig[masterType.toLowerCase()]?.displayName || 'Masters'}
                            </caption>
                            <MDBTableHead dark>
                                <tr>
                                    <th scope="col">Sr. No</th>
                                    <th scope="col">{masterTypeConfig[masterType.toLowerCase()]?.displayName}</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Created</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {masterData.length > 0 ? (
                                    masterData.map((item, index) => {
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
                                                    <MDBBtn color="link" rounded size="sm">
                                                        Edit
                                                    </MDBBtn>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No records found.
                                        </td>
                                    </tr>
                                )}
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListAllMasters;
