// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Assurez-vous que l’URL correspond à votre backend
});

export default api;
