import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import './LoginPage.css';
import axios from 'axios';  // Axios imported correctly
import { useNavigate } from 'react-router-dom';  // useNavigate imported correctly
import { Input, Ripple, initMDB } from "mdb-ui-kit";


function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate used for navigation after login

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if email or password is empty
    if (!username || !password) {
      alert('Both Username and Password are required.');
      return;  // Stop the function if validation fails
    }

    try {
      const response = await axios.post('http://localhost:8081/auth/login', {
        username: username,
        password: password
      },{'Content-Type':'application/json'});
      console.log(response.data.jwtToken); // Log or store the JWT token as needed

      if(response.data.jwtToken==null){
        alert('Login Failed.. Please try again');
        return;
        //console.error('Login failed:', error.response || error.message);
      }else{
        // Storing JWT token in session storage
        sessionStorage.setItem('jwtToken', response.data.jwtToken);

        // use below line to Retrieving JWT token from session storage
        //const token = sessionStorage.getItem('jwtToken');

        navigate('/mainpage'); // Navigate to homepage or dashboard after login
      }
      
    } catch (error) {
      console.error('Login failed:', error.response || error.message);
      // Optionally handle errors, e.g., show an error message
    }
  };

  // Example starter JavaScript for disabling form submissions if there are invalid fields

initMDB({ Input, Ripple });

(() => {
  //'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

  return (
      <MDBContainer className="my-5 gradient-form">
        <form onSubmit={handleLogin}>
          <MDBRow>
            <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">

              <div className="text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                     style={{width: '185px'}} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
              </div>

              <p>Please login to your account</p>

              <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'
                        onChange={(e) => setUsername(e.target.value)} />
              <div className="invalid-feedback">Please enter username.</div>
              
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'
                        onChange={(e) => setPassword(e.target.value)} />  
              <div className="invalid-feedback">Please enter password.</div>

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2 data-mdb-ripple-init">Sign in</MDBBtn>
                <a className="text-muted" href="#!">Forgot password?</a>
              </div>

              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Don't have an account?</p>
                <MDBBtn outline className='mx-2' color='danger'>
                  Danger
                </MDBBtn>
              </div>

            </div>

          </MDBCol>

            <MDBCol col='6' className="mb-5">
              <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 className="mb-4">We are more than just a company</h4>
                  <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
  );
}

export default LoginPage;