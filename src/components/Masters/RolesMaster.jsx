import React from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function MasterHomePage() {

  const buttonData = [
        { label: 'Roles Master', href: '/roles-master' },
        { label: 'User Master', href: '/user-master' },
        { label: 'Donations Type', href: '/donation-type'}
        // Add more button objects here
    ];


    return (
        <MDBContainer>
            <MDBRow className="justify-content-center mt-5">
                {buttonData.map((button, index) => (
                    <MDBCol md="4" key={index}>
                        <MDBBtn color="secondary" size="lg" block href={button.href}>
                            {button.label}
                        </MDBBtn>
                    </MDBCol>
                ))}
            </MDBRow>
        </MDBContainer>
    );
}

export default MasterHomePage;
