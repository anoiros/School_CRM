// src/pages/Home.jsx
import React from 'react';
import Login from './Login';

const Home = () => {
  return (
    <section className="bg-gray-100 min-h-screen flex flex-col">
        <div className="p-8 text-center">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">
                Bienvenue sur ClassNet
            </h1>
            <p className="mb-6 text-gray-600">
                Votre plateforme de gestion scolaire
            </p>
        </div>
        <div className="flex-1 flex items-center justify-center"> 
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                    Connexion
                </h3>
                <p className="mb-4 text-sm text-gray-500 text-center">
                    Connectez-vous pour accéder à ClassNet
               </p>
               <Login />
            </div>
        </div>
    </section>
  );
};

export default Home;
