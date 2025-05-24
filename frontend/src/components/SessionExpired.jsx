import React from 'react';

const SessionExpired = ({ message }) => {
    return (
        <div className=" bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
            {message}
        </div>
    );
};

export default SessionExpired;