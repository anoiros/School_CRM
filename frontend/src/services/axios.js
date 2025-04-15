import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Laravel tourne ici par défaut
  withCredentials: true, // Nécessaire si tu utilises Sanctum avec cookies
});

export default api;
