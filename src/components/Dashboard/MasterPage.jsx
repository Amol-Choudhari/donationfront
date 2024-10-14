import React from 'react';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const MasterPage = () => {
    const navigate = useNavigate();

    const handleNavigation = (masterType) => {
        navigate('/list-all-masters', { state: { masterType } });
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
                        <h2 className="mt-3 mb-4">Masters</h2>
                        <MDBBtn className='me-1' color='secondary' onClick={() => handleNavigation('Donation Type')}>
                            Donation Type
                        </MDBBtn>
                        <MDBBtn className='me-1' color='secondary' onClick={() => handleNavigation('Gender')}>
                            Gender
                        </MDBBtn>
                        <MDBBtn className='me-1' color='secondary' onClick={() => handleNavigation('Roles')}>
                            Roles
                        </MDBBtn>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MasterPage;
