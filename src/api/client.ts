// 기본 AXIOS 인스턴스
import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // 5s
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);
