import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        // Simple validation
        if (!username || !mobile) {
            setErrorMessage('Both Username and Mobile Number are required.');
            return;
        }

        setIsLoading(true);

        try {
            // API request to check username and mobile
            const response = await axios.post('http://localhost:8081/auth/forgot-password', {
                username: username,
                mobile: mobile,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data.success) {
                setSuccessMessage('Verification successful. Please check your email for reset instructions.');
            } else {
                setErrorMessage('Failed to verify. Please check your details and try again.');
            }
        } catch (error) {
            console.error('Error during password reset:', error.response || error.message);
            setErrorMessage('Error during password reset. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MDBContainer className="my-5 gradient-form">
            <form onSubmit={handleSubmit}>
                <MDBRow>
                    <MDBCol col='5' className="mb-5" style={{ maxWidth: '35%', margin: 'auto', marginTop: '5rem', border: '2px solid #ccc', borderRadius: '5px' }}>
                        <div className="d-flex flex-column">
                            <p className='mt-6'>Forgot Password</p>
                            <MDBInput 
                                wrapperClass='mb-4' 
                                label='Username' 
                                id='form1' 
                                type='text' 
                                required 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                            <MDBInput 
                                wrapperClass='mb-4' 
                                label='Mobile Number' 
                                id='form2' 
                                type='text' 
                                required 
                                value={mobile} 
                                onChange={(e) => setMobile(e.target.value)} 
                            />

                            <div className="text-center pt-1 mb-5 pb-1">
                                <MDBBtn type="submit" className="mb-4 w-100" disabled={isLoading}>
                                    {isLoading ? 'Verifying...' : 'Verify & Reset Password'}
                                </MDBBtn>
                            </div>

                            {/* Display Success or Error Messages */}
                            {successMessage && (
                                <div className="alert alert-success text-center" role="alert">
                                    {successMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                    </MDBCol>
                </MDBRow>
            </form>
        </MDBContainer>
    );
};

export default ForgotPasswordPage;
