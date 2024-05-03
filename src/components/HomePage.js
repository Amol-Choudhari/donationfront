import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const backgroundStyle = {
        backgroundImage: 'url("/Screenshot 2024-05-01 111623.png")',
        height: '100vh', // Full height
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
    };

    return (
        <div className="home-page-container" style={backgroundStyle}>
            <h1 className="home-page-title">Home Page</h1>
            <p className="home-page-content">Shree Sati Anasuya Mata Temple , Paradsinga.</p>
            <Link className="home-page-link" to="/login">Login</Link>
            {/* Add more links as needed */}
        </div>
    );
}

export default HomePage;
