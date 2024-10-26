// ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';
import '../styles/style.css';
import '../styles/ProductList.css';

const ProductList = ({ products, addToWishlist, addToCart }) => {
  // Ensure products is an array before calling map
  if (!Array.isArray(products)) {
    return <p>No products available</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          addToWishlist={addToWishlist} 
          addToCart={addToCart} 
        />
      ))}
    </div>
  );
};

export default ProductList;
