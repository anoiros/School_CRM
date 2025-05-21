import React from "react";

const QuickActions = ({ children }) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 w-full h-full">
            <div className="flex flex-col space-y-4">
                
                <div className="flex justify-center">
                    <h3 className="text-center text-xl font-semibold text-gray-600">
                        Raccourcis d’actions ⚡
                    </h3>
                </div>
            
                <div className="flex flex-col bg-blue-100 text-blue-600 p-10 rounded-xl text-2xl space-y-4">
                    {children}
                </div>         
            </div>
        </div>
    );
}

export default QuickActions;
