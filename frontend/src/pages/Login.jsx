import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';


const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Étape 1 : CSRF token
            await api.get('/sanctum/csrf-cookie');

            // Étape 2 : envoi des identifiants
            const res = await api.post('/api/login', {
                email,
                password,
            });
            
            console.log(res.data.token);
            alert('Connexion réussie');
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            navigate("/Dashboard");
        
        } catch (err) {
            console.error('Erreur login :', err);
            alert('Email ou mot de passe incorrect');
        }
    };

    return (
        <form onSubmit={handleLogin} className="w-full max-w-sm">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2"> Email </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="exemple@exemple.com"/>
                </div>
                
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2"> Mot de passe </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••"/>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
                    Se connecter 

                </button>
                <a href="./ResetPassword" className="block text-center mt-4 text-sm text-blue-600 hover:underline">
                    Mot de passe oublié ?
                </a>
      </form>
  
  );
};

export default Login;
