import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';

const Logout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async() => {
        setLoading(true); // Démarre le chargement
        try {
            await api.post('/logout');

            localStorage.removeItem('user');
            localStorage.removeItem('token');

            navigate('/');
        }   catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
            alert('Erreur lors de la déconnexion');
        } finally {
            setLoading(false); // Arrête le chargement
        }
    };
    
    return (
    <nav>
        <button onClick={handleLogout} className={`flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md w-full transition ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"}`}disabled={loading}>
              {loading && (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              )}
              {loading ? "déconnection..." : "Se déconnecter"}
        </button>
    </nav>
  );
};

export default Logout;