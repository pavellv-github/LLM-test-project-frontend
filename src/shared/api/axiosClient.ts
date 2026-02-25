import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    Accept: 'application/json'
  }
});
