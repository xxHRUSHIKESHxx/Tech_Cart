import { configureStore } from '@reduxjs/toolkit';
// import wishlistReducer from './WishlistSlice';
import cartReducer from './CartSlice';
import authReducer from './authSlice'; // Import authSlice

const store = configureStore({
  reducer: {
    wishlist: cartReducer,
    cart: cartReducer,
    auth: authReducer, // Add auth slice to the store
  },
});

export default store;
