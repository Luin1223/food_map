import axios from 'axios';

const username = import.meta.env.VITE_API_USERNAME;
const password = import.meta.env.VITE_API_PASSWORD;
const authHeader = 'Basic ' + btoa(`${username}:${password}`);

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Authorization': authHeader,
    'Content-Type': 'application/json'
  }
});

export const getRestaurants = async () => {
  return apiClient.get('/api/restaurants');
};