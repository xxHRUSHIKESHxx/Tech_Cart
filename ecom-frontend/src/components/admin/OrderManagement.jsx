import React, { useState, useEffect } from 'react';
import { fetchOrders, updateOrderStatusAPI } from '../../apis/orderapis';
import '../../styles/OrderManagement.css';
import StatusUpdateModal from './adminpopups/StatusUpdateModal'; // Import the status update modal
import AcceptabilityCheckModal from './adminpopups/AcceptabilityCheckModal'; // Import the acceptability check modal
import { toast, ToastContainer } from 'react-toastify'; // Anupam changed: Import toast and ToastContainer for notifications
import 'react-toastify/dist/ReactToastify.css'; // Anupam changed: Import toast styles

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAcceptabilityModalOpen, setIsAcceptabilityModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Anupam changed: Initialize toast notifications
  // useEffect(() => {
  //   toast.configure();
  // }, []);

  // Fetch orders on initial load or when currentPage changes
  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchOrders(currentPage);
        setOrders(data.results);
        console.log("orders", orders);
        setTotalPages(Math.ceil(data.count / 10));
        setLoading(false);
        toast.success('Orders fetched successfully!', {
          autoClose: 2000,
        });
      } catch (err) {
        setError('Error fetching orders.');
        setLoading(false);
        toast.error('Error fetching orders.'); // Anupam changed: Show error toast
      }
    };
    loadOrders();
  }, [currentPage]);

  // Open the status update modal
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Close the status update modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Open the acceptability check modal
  const openAcceptabilityModal = (order) => {
    setSelectedOrder(order);
    setIsAcceptabilityModalOpen(true);
  };

  // Close the acceptability check modal
  const closeAcceptabilityModal = () => {
    setIsAcceptabilityModalOpen(false);
    setSelectedOrder(null);
  };

  // Update the order status via API
  const updateOrderStatus = async (newStatus) => {
    if (selectedOrder) {
      try {
        await updateOrderStatusAPI(selectedOrder.id, newStatus);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === selectedOrder.id ? { ...order, status: newStatus } : order
          )
        );
        closeModal();
        toast.success('Order status updated successfully!'); // Anupam changed: Show success toast
      } catch (error) {
        console.error('Failed to update order status:', error);
        toast.error('Failed to update order status.'); // Anupam changed: Show error toast
      }
    }
  };

  // Count total amount for all items in an order
  const countTotalAmount = (items) => {
    return items.reduce((total, item) => total + Number(item.price_at_purchase), 0);
  };

  const getOrderStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'pending';
      case 'shipped':
        return 'shipped';
      case 'delivered':
        return 'delivered';
      case 'cancelled':
        return 'canceled';
      default:
        return '';
    }
  };
  return (
    <div className="order-management">
      <ToastContainer /> {/* Anupam changed: Initialize ToastContainer here */}
      <h2>Order Management</h2>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <>
          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            <div className="order-card-container">
              {orders.map((order) => (
                <div key={order.id} className={`order-card ${getOrderStatusClass(order.status)}`}>
                  <div className="order-card-header">
                    <h3>Order ID: {order.id}</h3>
                  </div>
                  <div className="order-card-body">
                    <p><strong>Number of Products:</strong> {order.items.length}</p>
                    <p><strong>Payment Status:</strong> {order.payment_status}</p>
                    <p><strong>Order Status:</strong> {order.status}</p> {/* Order status added */}
                    <p><strong>Total Amount:</strong> ${order.total_amount}</p>
                  </div>
                  <div className="order-card-actions">
                    <button onClick={() => openModal(order)}>Update Status</button>
                    <button onClick={() => openAcceptabilityModal(order)}>Check Acceptability</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="pagination-controls">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>
        </>
      )}

      {/* Modal for updating order status */}
      <StatusUpdateModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        currentStatus={selectedOrder?.status || 'pending'} // Updated to use 'status' instead of 'payment_status'
        onUpdateStatus={updateOrderStatus}
      />

      {/* Modal for checking acceptability */}
      <AcceptabilityCheckModal
        isOpen={isAcceptabilityModalOpen}
        closeModal={closeAcceptabilityModal}
        products={selectedOrder?.items || []} // Pass the items array as products
      />
    </div>
  );
};

export default OrderManagement;
