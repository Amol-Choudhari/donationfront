// src/components/NewElements/chartMonthly.js

import React from 'react';
import { LineChart, 
         Line, 
         XAxis, 
         YAxis, 
         CartesianGrid, 
         Tooltip, 
         Legend, 
         ResponsiveContainer,
         PieChart,
         Pie,
         Cell,
         Legend as PieLegend
        } from 'recharts';

const lineChartData = [
    { name: 'Jan', earnings: 4000 },
    { name: 'Feb', earnings: 3000 },
    { name: 'Mar', earnings: 2000 },
    { name: 'Apr', earnings: 2780 },
    { name: 'May', earnings: 1890 },
    { name: 'Jun', earnings: 2390 },
    { name: 'Jul', earnings: 3490 },
];

const pieChartData = [
    { name: 'Direct', value: 400, color: 'primary' },
    { name: 'Social', value: 300, color: 'success' },
    { name: 'Referral', value: 300, color: 'danger' },
];

const COLORS = ['#4e73df', '#1cc88a', '#e74a3b']; // Colors for the pie chart

const ChartMonthly = () => {
    return (
        <div className="row">
            <div className="col-xl-8 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                    </div>
                    <div className="card-body">
                        <div className="chart-area">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineChartData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
                                    <Tooltip />
                                    <Legend />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

              {/* Pie Chart */}
              <div className="col-xl-4 col-lg-5">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                    </div>
                    <div className="card-body">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"  

                                    dataKey="value"
                                    nameKey="name" 
                                    label
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <PieLegend />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 text-center small">
                            {pieChartData.map((item) => (
                                <span key={item.name} className="mr-2">
                                    <i className={`fas fa-circle text-${item.color}`}></i> {item.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartMonthly;