import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL:"http://ec2-3-111-53-105.ap-south-1.compute.amazonaws.com:8272",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
