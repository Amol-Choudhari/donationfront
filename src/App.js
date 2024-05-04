import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/SiteElements/Header'; // Make sure the path is correct
import Footer from './components/SiteElements/Footer'; // Make sure the path is correct
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import About from './components/Pages/About';
import Register from "./components/Pages/Register";
import MainPage from "./components/Dashboard/MainPage";


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
                    <Route path="/mainpage" element={<MainPage />} />

                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
