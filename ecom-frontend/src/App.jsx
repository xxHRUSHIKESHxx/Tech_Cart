import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login.jsx';
import Wishlist from './components/Wishlist.jsx';
import Cart from './components/Cart.jsx';
import ShopPage from './components/ShopPage';
import ProductDetail from './components/ProductDetail';
import BuyNowPage from './components/BuyNowPage';
import AdminPanel from './components/admin/AdminPanel';
import Dashboard from './components/admin/Dashboard';
import OrdersGraph from './components/admin/OrdersGraph';
import ProductManagement from './components/admin/ProductManagement';
import OrderManagement from './components/admin/OrderManagement';
import ThankYouPage from './components/ThankYouPage';
import PrivateRoute from './PrivateRoute.jsx';  // Import the PrivateRoute
import AcceptabilityDetails from './components/admin/adminpopups/AcceptabilityDetails.jsx';
import LandingPage from './components/Landingpage/Landingpage.jsx'; // Import LandingPage
import Feedback from './components/Feedback.jsx';
import Payment from './components/Payment.jsx';
import MultiProdPayment from './components/MultiProdPyament.jsx';
import UserProfile from './components/UserProfile.jsx';
import EditUserProfile from './components/EditUserProfile.jsx';
import FeedbackPage from './components/admin/adminpopups/FeedbackPage.jsx';
import './App.css'

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      if (!location.pathname.startsWith('/')) {
        navigate('/');
      }
    } else {
      // If logged in, check if admin or user
      if (isAdmin) {
        // If admin and not on an admin route, redirect to admin dashboard
        if (!location.pathname.startsWith('/admin')) {
          navigate('/admin/dashboard');
        }
      }
      // else {
      //   // If user and not on user profile route, redirect to profile
      //   if (!location.pathname.startsWith('/shop')) {
      //     navigate('/shop');
      //   }
      // }
    }
  }, [isLoggedIn, isAdmin, location, navigate]);



  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {/* Render the Navbar only if not on an admin route */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buy-now/:productId" element={<BuyNowPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/feedback" element={<Feedback />} /> {/* Add route for FeedbackPage */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/multi-prod-payment" element={<MultiProdPayment />} />

        {/* Protected User Routes */}
        <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path="/edit-user-profile" element={<PrivateRoute><EditUserProfile /></PrivateRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<PrivateRoute isAdminRoute={true}><AdminPanel /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders-graph" element={<OrdersGraph />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="feedbacks" element={<FeedbackPage />} />
        </Route>
        <Route
          path="/admin/acceptability-details"
          element={<PrivateRoute isAdminRoute={true}><AcceptabilityDetails /></PrivateRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
