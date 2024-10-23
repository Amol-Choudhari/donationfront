import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput} from 'mdb-react-ui-kit'; // Added MDBAlert
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Ripple, initMDB } from "mdb-ui-kit";

function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);   
    const [error, setError] = useState(null); 

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        setError(null);

        // Check if username or password is empty before setting isLoading
        if (!username || !password) {
            setError('Both Username and Password are required.');
            return;  // Stop the function if validation fails
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8081/auth/login', {
                username: username,
                password: password
            }, {'Content-Type': 'application/json'});

            console.log(response.data.jwtToken);

            if (response.data.jwtToken == null) {
                setError('Login Failed. Please try again.');
            } else {
                sessionStorage.setItem('jwtToken', response.data.jwtToken);
                navigate('/mainpage'); // Redirect after successful login
            }
        } catch (error) {
            console.error('Login failed:', error.response || error.message);
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    initMDB({ Input, Ripple });

    return (
        <MDBContainer className="my-5 gradient-form">
            <form onSubmit={handleLogin} className="needs-validation" noValidate>
                <MDBRow>
                    <MDBCol col='5' className="mb-5" style={{ maxWidth: '35%', margin: 'auto', marginTop: '5rem', border: '2px solid #ccc', borderRadius: '5px' }}>
                        <div className="d-flex flex-column">
                            <p className='mt-6'>Please login to your account</p>
                            <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' required value={username} onChange={(e) => setUsername(e.target.value)} />
                            <div className="invalid-feedback">Please enter username.</div>

                            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className="invalid-feedback">Please enter password.</div>

                            <div className="text-center pt-1 mb-5 pb-1">
                                <MDBBtn type="submit" className="mb-4 w-100 gradient-custom-2" disabled={isLoading}>
                                    {isLoading ? 'Loading...' : 'Sign in'}
                                </MDBBtn>
                                <a className="text-muted" href="#!">Forgot password?</a>
                            </div>
                            {/* Custom Alert for displaying error */}
                            {error && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {error}
                                </div>
                            )}
                        </div>
                    </MDBCol>
                </MDBRow>
            </form>
        </MDBContainer>
    );
}

export default LoginPage;
