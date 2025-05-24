import React, { useState, useEffect} from 'react';
import Logout from '../components/Logout';
import SessionExpired from '../components/SessionExpired';
import { Outlet } from 'react-router-dom';

const GlobalPage = ({ sidebar }) => {
    const [sessionMessage, setSessionMessage] = useState('');

    useEffect(() => {
        // Écoute d’un éventuel message de session expirée
        const handleSessionExpired = (event) => {
            if (event.detail?.message) {
                setSessionMessage(event.detail.message);

                // Disparition automatique au bout de 5 secondes
                setTimeout(() => setSessionMessage(''), 5000);
            }
        };

        window.addEventListener('session-expired', handleSessionExpired);
        return () => window.removeEventListener('session-expired', handleSessionExpired);
    }, []);

    return (
        <div className="flex min-h-screen">
            <div className="fixed top-0 left-0 w-[15%] h-screen flex-[0_0_15%] bg-[#1F2937] text-white p-0 flex flex-col space-y-4 shadow-lg items-center">
                {sidebar}
                <Logout/>
            </div>
            <div className="ml-[15%] flex-[0_0_85%] bg-gray-100 p-0">
                    {sessionMessage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <SessionExpired message={sessionMessage} />
                    </div>
                    )}
                <Outlet /> {/* Ici, s'affichera la page (ex: Students, Teachers...) */}
            </div>
        </div>  
    );
}

export default GlobalPage;
