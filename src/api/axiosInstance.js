import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://ec2-3-111-53-105.ap-south-1.compute.amazonaws.com:8272",
  headers: {
    'Content-Type': 'application/json',
  },
});


// axiosInstance.interceptors.request.use((config) => {
//   const AccessToken = localStorage.getItem("access_token");
//   if (AccessToken) {
//     config.headers.Authorization = `Bearer ${AccessToken}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// axiosInstance.interceptors.request.use((config) => {
//   const Token = localStorage.getItem("token");
//   if (Token) {
//     config.headers.Authorization = `Bearer ${Token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken && config.useAccessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  delete config.useAccessToken;
  return config;
});
export default axiosInstance;
