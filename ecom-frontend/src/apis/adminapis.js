import axios from 'axios';
import { MAIN_API } from "./mainapi";
import Cookies from 'js-cookie';
// Fetch all products
export const fetchProducts = async (page = 1) => {
  try {
    const response = await axios.get(`${MAIN_API}api/products/?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products.');
  }
};
export const fetchProductsByCategory = async (categoryId, page = 1) => {
  try {
    const response = await axios.get(`${MAIN_API}api/category/${categoryId}/`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products by category.');
  }
};
// Search for products by name
export const searchProducts = async (searchTerm, category) => {
  let url = `${MAIN_API}api/products/search/?`;

  if (category) {
    url += `category=${category}&`;
  }

  if (searchTerm) {
    url += `q=${searchTerm}`;
  }

  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    throw new Error('Error searching for products.');
  }
};

// Add a new product
export const addProduct = async (product) => {
  try {
    const token = Cookies.get('authToken'); // Get the token from cookies

    const response = await axios.post(`${MAIN_API}api/admin/products/`, product, {
      headers: {
        Authorization: `${token}`, // Pass the token in Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new Error('Error adding product.');
  }
};




// Delete a product
export const deleteProduct = async (id) => {
  try {
    const token = Cookies.get('authToken'); // Get the token from cookies

    const response = await axios.delete(`${MAIN_API}api/admin/products/${id}/delete/`, {
      headers: {
        Authorization: `${token}`, // Pass the token in Authorization header
      },
    });
    return response.data;  // Return the deleted product data (if any)
  } catch (error) {
    throw new Error('Error deleting product.');
  }
};


export const updateProduct = async (id, productData) => {
  try {
    // Log the form data
    // for (let [key, value] of productData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    const token = Cookies.get('authToken');

    // Making the axios PUT request
    const response = await axios.put(`${MAIN_API}api/admin/products/${id}/`, productData, {
      headers: {
        'Authorization': `${token}`, // Assuming 'Bearer' token type
        'Content-Type': 'multipart/form-data', // Ensure this is set for FormData
      },
    });

    // Axios resolves responses with status codes outside of 2xx range as errors,
    // so no need for response.ok check. Just return the response data.
    return response.data;

  } catch (error) {
    console.error('Error updating product:', error.response ? error.response.data : error.message);
    throw error;
  }
};



export const createCategory = async (categoryName) => {
  try {
    const token = Cookies.get('authToken'); // Get the auth token from cookies

    const response = await axios.post(`${MAIN_API}api/categories/create/`, {
      name: categoryName,
    }, {
      headers: {
        'Authorization': `${token}`,
      },
    });

    return response.data; // Return the response data (new category)
  } catch (error) {
    console.error('Failed to create category:', error);
    throw error; // Re-throw the error to be handled by the component
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${MAIN_API}api/categories/`);
    return response.data// Store the fetched categories
  } catch (error) {
    console.error('Error fetching categories:', error);
    setError('Failed to fetch categories.');
  }
}

// Function to fetch order data from the backend
export const fetchOrderSummary = async () => {
  try {
    const token = Cookies.get('authToken'); // Get the token from cookies
    const response = await axios.get(`${MAIN_API}api/orders/daily-summary/`, {
      headers: {
        Authorization: `${token}`, // Pass the token in Authorization header
      },
    });

    return response.data;  // Return the fetched data
  } catch (error) {
    console.error('Error fetching order data:', error);
    throw error;  // Throw error so the component can handle it if needed
  }
};
