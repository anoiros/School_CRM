import React from 'react';

const Profil = () => {

    const user = JSON.parse(localStorage.getItem('user')) || null;

    return (
        <div className="flex flex-col items-center py-4">
            <img src={user?.photoUrl || "/default-profile.png"} alt="Profil" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"/>
            <p className="mt-2 text-sm font-medium">{user?.name || "Nom d'utilisateur"}</p>
            <a href='/profil' className="text-blue-500 hover:underline mt-1">Gérer le profil</a>
        </div>
    );
};

export default Profil;