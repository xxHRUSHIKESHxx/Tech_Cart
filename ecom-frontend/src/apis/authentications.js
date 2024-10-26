import axios from "axios";
import { MAIN_API } from "./mainapi";
import Cookies from 'js-cookie';

// Signup function
export const signup = async (payload) => {
    try {
        const response = await axios.post(`${MAIN_API}api/register/`, payload);

        if (response.status !== 201) {
            throw new Error('Registration failed.');
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

// Login function
export const login = async (payload) => {
    try {
        const response = await axios.post(`${MAIN_API}api/login/`, payload);

        if (response.status === 200) {
            handleLoginResponse(response.data);
            return response.data;
        } else {
            throw new Error('Login failed.');
        }
    } catch (error) {
        throw error;
    }
};

// Handle the login response by storing the token and user info
const handleLoginResponse = ({ token, user , cart }) => {
    // Store the token in a cookie (expires in 7 days)
    Cookies.set('authToken', token, { expires: 7 });
    
    // Optionally store other user details in local storage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('cart', JSON.stringify(cart));
};




// Create a function for logging out
export const logoutAPI = async (token) => {
    try {
        // To retrieve the token from the cookie
        const token = Cookies.get('authToken');
        const response = await axios.post(
            `${MAIN_API}api/logout/`,
            {},
            {
                headers: {
                    Authorization: `${token}`  // Pass token in Authorization header
                },
                withCredentials: true               // Ensure cookies are included if necessary
            }
        );
        return response.data;  // Return response data if needed
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

// Logout function
export const logout_user = () => {
    // Remove the token from cookies
    Cookies.remove('authToken');

    // Clear user details from local storage
    localStorage.clear();
};

// Function to retrieve the stored token
export const getToken = () => {
    return Cookies.get('authToken');
};
