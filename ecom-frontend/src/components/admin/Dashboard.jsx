import React from 'react';
import OrdersGraph from './OrdersGraph';
// import '../../styles/Dashboard.css';

const Dashboard = () => {
  // console.log(localStorage.getItem('token'));
  return (
    <div className="dashboard">

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Admin Dashboard</h2>
      </div>
      <OrdersGraph />
    </div>
  );
};

export default Dashboard;
