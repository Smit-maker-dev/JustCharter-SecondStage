import axios from 'axios';
import { toast } from 'react-toastify';

export const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BASE_URL)
  ? import.meta.env.VITE_BASE_URL
  : (typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:8272'
      : 'https://api.justcharter.in');

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.skipAuthRedirect) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem('access_token');
      localStorage.removeItem('token');

      setTimeout(() => {
        window.location.href = '/Login'; 
      }, 1500);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
