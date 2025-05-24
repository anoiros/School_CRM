import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";

const Logs = ({ lastest }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([null]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');  


    const handleView = (item) => {
        setSelectedRow(item);
    }

    const handleClose = () => {
        setSelectedRow(null);
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                if (lastest) {
                    const response = await api.get('/audit-logs/latest');
                    setData(response.data);
                    return;
                }
                const response = await api.get('/audit-logs');
                setData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des actions :', error);
                setError('Erreur lors de la récupération des actions');
            } finally {
                setLoading(false);
            }
        };

        fetch();
     }, [navigate, lastest]);

 
    if (loading) {
    return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center space-y-4"> 
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-600">Chargement de la page</p>
        </div>
    </div>
    );} 

    if (error) {
        return <div className='flex justify-center items-center'>{error}</div>;
    }

    const head = [
        { key: 'id', label: 'ID' },
        { key: 'user', label: 'Utilisateur' },
        { key: 'action', label: 'Action' },
        { key: 'target_id', label: 'ID de la cible' },
        { key: 'target_type', label: 'Type de cible' },
        { key: 'created_at', label: 'Date de l\'action' },
    ];

    const filteredContent = data.filter(item => {
        return head.some(({ key }) => {
            const value = item[key];
            if (value === null || value === undefined) return false;
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    return (
        <>
        <div className="p-10 shadow-md rounded-lg">
            <h1 className="text-xl font-bold mb-4">Liste des dernières actions</h1>
            <div className="overflow-x-auto shadow-md rounded-lg bg-white">
                <div className="flex justify-between items-center p-4">
                    <div className="flex items-center">
                        { !lastest && (
                            <>
                            <input type="text" placeholder="Rechercher..." className="border px-4 py-2 rounded w-72 h-12" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                            </>
                        )}
                    </div>
                </div>
                <table className="min-w-full border">
                    <thead>
                        <tr>
                            {head.map(({ label }, index) => (
                                <th key={index} className="border px-4 py-2">
                                    {label}
                                </th>
                            ))}
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredContent) && filteredContent.length > 0 ? (
                        filteredContent.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {head.map(({ key }, colIndex) => (
                            <td key={colIndex} className="border px-4 py-2">
                                {item[key]}
                            </td>
                            ))}
                            <th className="border px-4 py-2 font-normal">
                                <button onClick={() => handleView(item)} className="text-blue-500 hover:underline mr-2">
                                    Voir
                                </button>
                            </th>
                        </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan={head.length + 1} className="text-center py-4">Aucun résultat trouvé</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        {/* View Modal */}
        {selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded shadow-xl w-full max-w-xl">
                <h2 className="text-lg font-bold mb-2 flex justify-center">Détails de la ligne</h2>
                <table className="text-lg pt-3">
                    <tbody>
                        {head.map(({ key, label }, index) => (
                        <tr key={index} className="mb-1">
                            <td>
                                <strong>{label}:</strong>
                            </td>
                            <td className='px-5 py-1'>
                                {selectedRow[key]}
                            </td> 
                        </tr>
                        ))}
                    </tbody>
                    
                </table>
                <div className="flex justify-center mt-4 space-x-4">
                    <button onClick={() => handleClose()} className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
        )}
        </>
    );
}


export default Logs;