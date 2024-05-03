import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/SiteElements/Header'; // Make sure the path is correct
import Footer from './components/SiteElements/Footer'; // Make sure the path is correct
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import About from './components/Pages/About';
import Register from "./components/Pages/Register";

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
