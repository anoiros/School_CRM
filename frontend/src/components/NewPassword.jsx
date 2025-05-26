import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';


const NewPassword = () => {
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleConfirm = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);
        
        if (password !== passwordConfirm) {
            setError(true);
            setMessage('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            await api.post('/api/reset-password/code', {
                email,
                code,
                password,
                password_confirmation: passwordConfirm,
            });
        
            setMessage('Mot de passe réinitialisé avec succès, redirection...');
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (err) {
            setError(true);
            setMessage(err.response?.data?.error || 'Erreur lors de la réinitialisation.');
        } finally {
            setLoading(false);
        }
    }

    const Fermer = () => {
        setMessage(null);
        if(!error){
            localStorage.removeItem('email');
            navigate('/');
        }
    }

    return (
        <>
        <div className="w-full max-w-sm">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2"> Code de validation </label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder=""/>

                <label className="block text-gray-700 text-sm font-semibold mb-2"> Nouveau mot de passe </label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nouveau mot de passe"/>

                <label className="block text-gray-700 text-sm font-semibold mb-2"> Confirmer le mot de passe </label>
                <input type="text" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nouveau mot de passe"/>
            </div>
            <div>
                <button onClick={() => handleConfirm()} disabled={loading} className={`w-full px-4 py-2 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}>
                    {loading ? 'Chargement...' : 'Réinitialiser le mot de passe'}
                </button>
            </div>
        </div>
        {message && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded shadow-xl w-full max-w-xl">
                <h2 className="text-lg font-bold mb-2 flex justify-center">  {message}</h2>
                <div className="flex justify-center mt-4 space-x-4">
                    <button onClick={() => Fermer()} className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Réessayer
                    </button>
                </div>
            </div>
        </div>
        )}
    </>
    );
}

export default NewPassword;