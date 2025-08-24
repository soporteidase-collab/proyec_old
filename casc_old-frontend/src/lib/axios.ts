// src/lib/axios.ts
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// conservar tu token si ya existe
const token = localStorage.getItem('token');
if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;

export default axios;
