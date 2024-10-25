import React from 'react';
import './Layout.css';
import logo from './anasuyamata-logo.png';

const Navbar = () => {
    return (
        <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                {/* Left Logo */}
                <div className="d-flex align-items-center">
                    <img
                        src={logo}
                        className="rounded-circle me-3"
                        height="70"
                        alt="Avatar"
                        loading="lazy"
                    />
                </div>

                {/* Title in the Center */}
                <div className="text-center">
                    <h4 className="mb-0"><b>Shree Sati Anasuya Mata Sansthan, Paradsinga</b></h4>
                </div>

                {/* Right Logo */}
                <div className="d-flex align-items-center">
                    <img
                        src={logo}
                        className="rounded-circle ms-3"
                        height="70"
                        alt="Avatar"
                        loading="lazy"
                    />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
