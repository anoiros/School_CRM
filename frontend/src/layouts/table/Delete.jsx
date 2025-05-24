import React from 'react';
import { useState } from 'react';
import api from '../../services/axios';

const Delete = ({head , selectedRow, handleClose, apiEndpoint, onSuccess} ) => {

    const [loading, setLoading] = useState(false); 
    const [message, setMessage] = useState(null);
    const [isDone, setIsDone] = useState(null);

    const handleConfirm = async () => {
        try {
            setLoading(true); // Démarrer le chargement
            const response = await api.delete(`${apiEndpoint}/${selectedRow.id}`);
            setIsDone(true);
            setMessage("Données supprimer avec succès");
            console.log('Données supprimer avec succès :', response.data);
        } catch (error) {
            setIsDone(false);
            const errorMessage = error.response?.data?.message || 'Erreur inconnue';
            console.error('Erreur lors de la suppression des données :', error);
            setMessage("Erreur lors de la suppression des données : " + errorMessage);
        } finally {
            setLoading(false); // Arrêter le chargement
        }
    };

    const Fermer = () => {
        if(isDone){
            setMessage(null);
            setIsDone(null);
            onSuccess();
            handleClose();
            return;
        }
        setMessage(null);
        setIsDone(null);
    }

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded shadow-xl w-full max-w-xl">

            <h2 className="text-lg font-bold mb-2 flex justify-center">Supprimer la ligne</h2>
            <div className="bg-red-50 border border-red-200 p-4 rounded mb-4 text-center">
                <span className="block text-red-700 font-semibold text-lg">
                    Voulez-vous vraiment supprimer cet enregistrement ?
                </span>
                <hr className="my-3 border-red-200" />
                <span className="block text-sm text-red-600">
                    Toutes les données associées à cet enregistrement seront supprimées.
                </span>
            </div>
            
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
                <button onClick={handleClose} className="w-36 mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Annuler
                </button>

                <button onClick={() => handleConfirm()} className={`w-36 mt-4 bg-blue-500 text-white px-3 py-1 rounded flex justify-center items-center transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`} disabled={loading}>
                    {loading && (
                        <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>Chargement...
                        </>
                    )}
                    {loading ? "" : "Confirmer"}
                </button>
            </div>
        </div>
        {message && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> 
                <div className="bg-white p-10 rounded shadow-xl w-full max-w-xl">
                    <h2 className="text-lg font-bold mb-2 flex justify-center text-red-600">  Message </h2>
                    <div className="flex justify-center mt-4 space-x-4">
                        <span>
                            {message}
                        </span>
                    </div>
                    <div className="flex justify-center mt-4 space-x-4">
                        <button onClick={() => Fermer()} className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
            )}
    </div>
    )
}

export default Delete