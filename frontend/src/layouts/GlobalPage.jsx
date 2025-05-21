import React from 'react';
import Logout from '../components/Logout';
import { Outlet } from 'react-router-dom';

const GlobalPage = ({ sidebar }) => {
    return (
        <div className="flex min-h-screen">
            <div className="fixed top-0 left-0 w-[15%] h-screen flex-[0_0_15%] bg-[#1F2937] text-white p-0 flex flex-col space-y-4 shadow-lg items-center">
                {sidebar}
                <Logout/>
            </div>
            <div className="ml-[15%] flex-[0_0_85%] bg-gray-100 p-0">
                <Outlet /> {/* Ici, s'affichera la page (ex: Students, Teachers...) */}
            </div>
        </div>  
    );
}

export default GlobalPage;
