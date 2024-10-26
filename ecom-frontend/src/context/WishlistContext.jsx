import React, { createContext, useContext, useState } from 'react';

// Create Wishlist Context
const WishlistContext = createContext();

// Wishlist Provider Component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product, isWishlisted) => {
    if (isWishlisted) {
      // Add product to wishlist
      setWishlist((prevWishlist) => [...prevWishlist, { ...product, isWishlisted: true }]);
    } else {
      // Remove product from wishlist
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== product.id));
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the Wishlist Context
export const useWishlist = () => {
  return useContext(WishlistContext);
};
