import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/SiteElements/Header'; // Make sure the path is correct
import Footer from './components/SiteElements/Footer'; // Make sure the path is correct
import LoginPage from './components/Pages/LoginPage';
import About from './components/Pages/About';
import ForgotPasswordPage from "./components/Pages/ForgotPasswordPage";
import MainPage from "./components/Dashboard/MainPage";
import DonationPage from "./components/Dashboard/DonationPage";
import ReportPage from './components/Dashboard/ReportPage';
import MasterPage from './components/Dashboard/MasterPage';
import ManageUsers from './components/Dashboard/ManageUsers';
import UserForm from './components/Users/UserForm';
import DonationForm from './components/Donation/DonationForm';
import ListAllMasters from './components/Master/ListAllMasters';
import AddMaster from './components/Master/AddMaster';
import AuthWrapper from './components/Authentication/AuthWrapper';
import ChangePassword from './components/Authentication/ChangePassword';


function App() {
    return (
        <Router>
            <div>
                <Header />
                <AuthWrapper>
                    <Routes>
                        <Route exact path="/" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
                        <Route path="/mainpage" element={<MainPage />} />
                        <Route path="/donation" element={<DonationPage />} /> {/* Use element instead of component */}
                        <Route path="/report" element={<ReportPage />} />
                        <Route path="/masters" element={<MasterPage />} />
                        <Route path="/manageusers" element={<ManageUsers />} />
                        <Route path="/changePassword" element={<ChangePassword />} />
                        <Route path="/userform" element={<UserForm />} />
                        <Route path="/userform/:userId" element={<UserForm />} />
                        <Route path="/manageusers" element={<ManageUsers />} />
                        <Route path="/donationform" element={<DonationForm />} />
                        <Route path="/donationform/:donationId" element={<DonationForm />} />
                        <Route path="/list-all-masters" element={<ListAllMasters />} />
                        <Route path="/add-master" element={<AddMaster />} />

                    </Routes>
                </AuthWrapper>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
