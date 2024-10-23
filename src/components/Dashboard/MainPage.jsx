import React, { useState, useEffect } from 'react';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import './MainPage.css';
import { Link } from 'react-router-dom';
import Card from '../NewElements/Card'
import axios from 'axios';
import ChartMonthly from '../NewElements/ChartMonthly';

const MainPage = () => {

    const [values, setValues] = useState({
        monthlyEarnings: "₹0", 
        annualEarnings: "₹0",
        pendingRequests: 0,
    });

    useEffect(() => {
        const fetchValues = async () => {
            try {
                const response = await axios.get('http://localhost:8081/user/getusers'); // API call using axios

                // Update the state with the fetched values
                setValues({
                    monthlyEarnings: response.data.monthlyEarnings,
                    annualEarnings: response.data.annualEarnings,
                    pendingRequests: response.data.pendingRequests,
                });
            } catch (error) {
                console.error('Error fetching values:', error);
            }
        };

        fetchValues();
    }, []);


   

   
    // Static data with fetched values for "value" fields
    const cardData = [
        { id: 1, title: "Earnings (Monthly)", value: values.monthlyEarnings, icon: "fa-calendar", color: "primary" },
        { id: 2, title: "Earnings (Annual)", value: values.annualEarnings, icon: "fa-indian-rupee-sign", color: "success" },
        { id: 3, title: "Tasks", completed: 50, total: 100, icon: "fa-clipboard-list", color: "info" },
        { id: 4, title: "Pending Requests", value: values.pendingRequests, icon: "fas fa-comments", color: "warning" },
    ];
    

    return (
        <>
        <NavBar />
        <div className="row">
            <aside className="col-lg-2">
                <SideBar />
            </aside>
            <div className="col-lg-10">
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <header className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"></header>
                        <div className="container-fluid">
                            <header  className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                    <Link to="/reports" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                    <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
                                </Link>
                            </header>

                            <div className="row">
                                {cardData.map((data) => (
                                    <Card key={data.id} {...data} /> 
                                ))}
                            </div>

                            <ChartMonthly />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default MainPage;