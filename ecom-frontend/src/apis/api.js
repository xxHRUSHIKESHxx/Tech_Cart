// src/api.js
import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Change this to your actual backend base URL
  withCredentials: true, // Enables sending cookies with requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
