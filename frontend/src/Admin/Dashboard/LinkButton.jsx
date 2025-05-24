import React from "react";
import {useNavigate} from "react-router-dom";

const LinkButton = ({ to, children, icon }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${to}?autoclick=true`);
    };

    return (
        <div 
            onClick={handleClick}
            className="bg-blue-500 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition duration-300 hover:cursor-pointer flex items-center space-x-4 shadow-md"
        >
            <div className="flex-[0_0_30%] grid place-items-center">{icon}</div>
            <div className="flex-[0_0_70%] justify-start">{children}</div>
        </div>
    );
}

export default LinkButton;