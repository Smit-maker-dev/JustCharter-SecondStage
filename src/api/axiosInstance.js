// import axios from 'axios';

// const axiosInstance = axios.create({
//   // baseURL: "http://ec2-3-111-53-105.ap-south-1.compute.amazonaws.com:8272",
//   baseURL: "https://api.justcharter.in",
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token') || localStorage.getItem('token');

//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }

//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default axiosInstance;
import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: "https://api.justcharter.in",
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
    if (error.response?.status === 401) {
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
