import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Logout from '../components/Logout';

const Student = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        // Si le user ou le token est "undefined" ou null → redirection
        if (!storedUser || storedUser === "undefined") {
            navigate('/');
        }
        
        // Récupérer et stocker les informations du user et token
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken); 
        }
    }, [navigate]);
    
    // Si le user n'est pas encore chargé, ne rien afficher
    if (!user) return null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">Tableau de bord Student</h1>
            <p className="mb-6 text-gray-600">Bienvenue, {user.name}!</p>
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Informations utilisateur</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rôle:</strong> {user.role}</p>
                <p><strong>Token:</strong> {token}</p>
            </div>
            <div className="mt-6">
                <Logout />
            </div>
        </div>
    );
}

export default Student;