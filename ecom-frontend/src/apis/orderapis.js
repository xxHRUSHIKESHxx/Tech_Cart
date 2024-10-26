import axios from 'axios';
import { MAIN_API } from "./mainapi";
import Cookies from 'js-cookie';
export const fetchOrders = async (page = 1) => {
  const token = Cookies.get('authToken');;

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${MAIN_API}api/all-orders/?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, // Use the token from the cookies
      },
    });
    //   console.log('order data' , response.data);
    return response.data; // Return the data directly
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
};



export const updateOrderStatusAPI = async (orderId, newStatus) => {
  const token = Cookies.get('authToken'); // Fetch the token from cookies

  try {
    const response = await axios.put(
      `${MAIN_API}api/orders/${orderId}/status/`,
      { status: newStatus }, // Pass the status as JSON
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`, // Include the token in the headers
        },
      }
    );
    return response.data; // Return the updated order data
  } catch (error) {
    console.error('Failed to update order status:', error);
    throw error; // Throw the error to be caught by the calling function
  }
};

export const checkOrderAcceptabilityAPI = async (products) => {
  console.log("product data" , products);
  const response = await axios.post(`${MAIN_API}api/check-acceptability/`, { products : products });
  return response.data;
};

