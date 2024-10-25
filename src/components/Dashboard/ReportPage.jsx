import React from 'react';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';

const ReportPage = () => {
    return (
        <div className="container-fluid pt-4">
            <NavBar />
            <div className="row">
                <div className="col-lg-3">
                    <SideBar />
                </div>
                <div className="col-lg-9" style={{ marginTop: '58px' }}>
                    <div className="container">
                        <h2 className="mt-3 mb-4 text-center">Reports</h2>
                        <div className="row">
                            {/* Users Report Card */}
                            <div className="col-md-6 mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">Users Reports</h5>
                                        <p className="card-text">List of users added to the application.</p>
                                        <button type="button" className="btn btn-primary">Check</button>
                                    </div>
                                </div>         
                            </div>
                            
                            {/* Donation Report Card */}
                            <div className="col-md-6 mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">Donation Reports</h5>
                                        <p className="card-text">List of donations made to the temple.</p>
                                        <button type="button" className="btn btn-primary">Check</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportPage;
