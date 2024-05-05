import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/SiteElements/Header'; // Make sure the path is correct
import Footer from './components/SiteElements/Footer'; // Make sure the path is correct
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import About from './components/Pages/About';
import Register from "./components/Pages/Register";
import MainPage from "./components/Dashboard/MainPage";
import DonationPage from "./components/Dashboard/DonationPage";
import ReportPage from './components/Dashboard/ReportPage';
import MasterPage from './components/Dashboard/MasterPage';
import ManageUsers from './components/Dashboard/ManageUsers';
import UserForm from './components/Users/UserForm';
import UserDetails from './components/Users/UserDetails';


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
                    <Route path="/donation" element={<DonationPage />} /> {/* Use element instead of component */}
                    <Route path="/report" element={<ReportPage />} />
                    <Route path="/masters" element={<MasterPage />} />
                    <Route path="/manageusers" element={<ManageUsers />} />

                    <Route path="/userform" element={<UserForm />} />
                    <Route path="/manageusers" element={<ManageUsers />} />


                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
