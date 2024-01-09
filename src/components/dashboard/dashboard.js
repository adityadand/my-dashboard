// components/Dashboard.js

import React from 'react';
import PaymentSection from '../PaymentSection/PaymentSection';

import './dashboard.css';
import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <PaymentSection />
      </div>
    </div>
  );
};

export default Dashboard;
