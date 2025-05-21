import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios'; // Assure-toi que ton API est correctement configurée

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true); // Démarre le chargement
    e.preventDefault();
    try {

      // Étape 1 : Envoi de la requête pour la connexion
      const res = await api.post('/login', {
        email,
        password,
      });

      const { access_token, user } = res.data;

      // Étape 2 : Enregistrement des informations dans localStorage
      localStorage.setItem('user', JSON.stringify(user));  // Sauvegarde l'utilisateur
      localStorage.setItem('token', access_token);// Sauvegarde le token

      // Étape 3 : Redirection vers le dashboard
      navigate(`/${user.role}/dashboard`);

    } catch (err) {
      console.error('Erreur de connexion :', err);
      alert('Email ou mot de passe incorrect');
    } finally {
      setLoading(false); // Arrête le chargement
    }
  };

    return (
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2"> Email </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value.trim())} required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="exemple@exemple.com"/>
          </div>
      
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2"> Mot de passe </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••"/>
          </div>
              
          <button type="submit" className={`flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md w-full transition ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}disabled={loading}>
              {loading && (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              )}
              {loading ? "Connexion..." : "Se connecter"}
          </button>

          <a href="./ResetPassword" className="block text-center mt-4 text-sm text-blue-600 hover:underline">
            Mot de passe oublié ?
          </a>
          
        </form>
  );
};

export default Login;
