import React from 'react';
import './Layout.css';
import logo from './anasuyamata-logo.png';


const Navbar = () => {
  return (
    <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      {
        
         <div className="container-fluid">
        <img src={logo}
                className="rounded-circle"
                height="70"
                alt="Avatar"
                loading="lazy"
                border="1"
              />

        
         <h4><b>Shree Sati Anasuya Mata Sansthan, Paradsinga</b></h4>
        

        <img src={logo}
                className="rounded-circle"
                height="70"
                alt="Avatar"
                loading="lazy"
                border="1"
              />
      </div>
      }
     
    </nav>
  );
}

export default Navbar;
