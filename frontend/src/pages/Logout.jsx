import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
    };
    
    return (
    <nav>
        <button onClick={handleLogout} className='bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300'>
            Déconnexion
        </button>
    </nav>
  );
};

export default Logout;