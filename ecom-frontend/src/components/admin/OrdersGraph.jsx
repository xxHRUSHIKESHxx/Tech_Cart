import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { fetchOrderSummary } from '../../apis/adminapis';  // Import the API function

const OrdersGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await fetchOrderSummary();
        setData(orderData);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchData();  // Fetch data when component mounts
  }, []);
  
  console.log('data from order graph:', data);

  return (
    <div className="orders-graph">
      <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Daily Orders & Revenue</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* Change the dataKey to "day" to map dates to X-axis */}
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Bar for orders */}
          <Bar dataKey="orders" fill="#8884d8" />
          {/* Bar for amount */}
          <Bar dataKey="amount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersGraph;
