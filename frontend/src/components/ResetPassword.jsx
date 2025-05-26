import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleLogin = async (e) => {
        setLoading(true);
        try {
            console.log(email);
            const res = await api.post('/reset', {
                email: email,
            });

            if (res.status === 200) {
                localStorage.setItem('email', email);
                navigate('/ResetPassword/Reset');
            }
        } catch (err) {
            console.error('Erreur de connexion :', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <div className="w-full max-w-sm">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2"> Email </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value.trim())} required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="exemple@exemple.com"/>
            </div>
            <div>
                <button onClick={() => handleLogin()} disabled={loading} className={`w-full px-4 py-2 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}>
                    {loading ? 'Chargement...' : 'Réinitialiser le mot de passe'}
                </button>
            </div>
        </div>
        {error && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded shadow-xl w-full max-w-xl">
          <h2 className="text-lg font-bold mb-2 flex justify-center">  Email introuvable, veuillez réessayer</h2>
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
}

export default ResetPassword;