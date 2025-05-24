import axios from 'axios';

// Créer une instance d'Axios pour l'API
const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Remplace avec ton backend Laravel
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Ajouter un intercepteur pour ajouter automatiquement le token JWT dans chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Récupère le token depuis localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Ajoute le token JWT dans l'en-tête Authorization
  }
  return config;
});


api.interceptors.response.use(
  res => res,
  error => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      const isLoginRoute =
        originalRequest.url.includes('/login')

      if (!isLoginRoute) {
        // Envoie un événement personnalisé vers React
        const event = new CustomEvent('session-expired', {
          detail: { message: 'Votre session a expiré, veuillez vous reconnecter.' }
        });
        window.dispatchEvent(event);

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
