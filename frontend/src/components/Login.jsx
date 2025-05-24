import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await api.post('/login', {
        email,
        password,
      });

      const { access_token, user } = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', access_token);

      if (user.role === "teacher") {
        navigate(`/${user.role}/classes`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }

    } catch (err) {
      console.error('Erreur de connexion :', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
    {error && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded shadow-xl w-full max-w-xl">
          <h2 className="text-lg font-bold mb-2 flex justify-center">  Erreur de connexion, veuillez vérifier vos identifiants</h2>
          <div className="flex justify-center mt-4 space-x-4">
            <button onClick={() => setError(false)} className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Réessayer
            </button>
          </div>
        </div>
      </div>
      )}
    </>
    
  );
};

export default Login;
