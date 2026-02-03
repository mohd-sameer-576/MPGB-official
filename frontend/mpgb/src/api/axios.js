import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mpgb-official.onrender.com/api', // Match your backend port
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;