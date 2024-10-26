// src/apis/cartApi.js
import axios from 'axios';
import { MAIN_API } from './mainapi'; // Import your main API URL
import Cookies from 'js-cookie'; // Import js-cookie for token management

// Fetch Cart Items
export const fetchCartItems = async () => {
  const token = Cookies.get('authToken'); // Get the token from cookies
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${MAIN_API}api/cart/items/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, // Use Bearer token format
      },
    });
    return response.data; // Return the cart items directly
  } catch (error) {
    throw new Error('Failed to fetch cart items');
  }
};

// Add Cart Item
export const addCartItem = async (productId, quantity) => {
  const token = Cookies.get('authToken'); // Get the token from cookies

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.post(
      `${MAIN_API}api/cart/add/`,
      {
        product_id: productId,
        quantity, // Pass the quantity directly
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`, // Use Bearer token format
        },
      }
    );
    console.log(response)
    return response.data; // Return the response data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to add item to cart');
  }
};


//  delete 
export const deleteCartItem = async (itemId) => {
  console.log('hitting remove cart item')
  const token = Cookies.get('authToken'); // Get the token from cookies
  const cart = JSON.parse(localStorage.getItem('cart')); // Get the cart id from cookies
  console.log("cart_id", cart , itemId);
  if (!token) {
    throw new Error('No token found');
  }
 
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/cart/${cart.id}/items/${itemId}/delete/`,
      {
        headers: {
          'Authorization': `${token}`, // Use Bearer token format
        },
      }
    );
    console.log(response)
    return response.data; // Return the response data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete item from cart');
  }
};