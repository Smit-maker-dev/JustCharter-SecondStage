// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL:"http://ec2-3-111-53-105.ap-south-1.compute.amazonaws.com:8272",
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default axiosInstance;
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://ec2-3-111-53-105.ap-south-1.compute.amazonaws.com:8272",
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
