import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/ThankYouPage.css';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {}; // Destructure order from state

  console.log("order data", order);

  const handleBackToHome = () => {
    navigate('/shop');
  };

  // Function to generate PDF invoice
  const downloadInvoice = () => {
    const doc = new jsPDF();

    // Add order details to the PDF
    doc.text('Invoice', 20, 10);
    doc.text(`Order ID: ${order.order_id}`, 20, 20);
    doc.text(`Total Amount: ${order.total_amount} Rs`, 20, 30);
    doc.text(`Shipping Address: ${order.shipping_address}`, 20, 40);
    doc.text(`Billing Address: ${order.billing_address}`, 20, 50);

    // Add order items to PDF as a table
    const tableColumn = ['Product Name', 'Quantity', 'Price at Purchase', 'Total Price'];
    const tableRows = order.order_items.map(item => [
      item.product_name,
      item.quantity,
      `₹${item.price_at_purchase}`,
      `₹${item.total_price}`
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
    });

    // Add payment details
    doc.text('===Payment Details===', 20, doc.previousAutoTable.finalY + 10);
    doc.text(`Payment ID: ${order.payment_details.payment_id}`, 20, doc.previousAutoTable.finalY + 20);
    doc.text(`Payment Method: ${order.payment_details.payment_method}`, 20, doc.previousAutoTable.finalY + 30);
    doc.text(`Payment Status: ${order.payment_details.payment_status}`, 20, doc.previousAutoTable.finalY + 40);
    doc.text(`Transaction ID: ${order.payment_details.transaction_id}`, 20, doc.previousAutoTable.finalY + 50);

    // Save the generated PDF
    doc.save('invoice.pdf');
  };

  return (
    <div className="thank-you-page">
      <h2 className="thank-you-message">Thank You for Your Purchase!</h2>
      <p className="thank-you-description">Your order has been placed successfully.</p>

      {/* Add Download Invoice button */}
      {order && (
        <button onClick={downloadInvoice} className="download-invoice-btn">
          Download Invoice
        </button>
      )}

      <button onClick={handleBackToHome} className="back-to-home-btn">
        Back to Home
      </button>
    </div>
  );
};

export default ThankYouPage;
