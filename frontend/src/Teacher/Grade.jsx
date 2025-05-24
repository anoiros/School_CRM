import React, { useState } from 'react';
import api from '../services/axios';

const Grade = ({head , selectedRow, handleClose}) => {

    const [formData, setFormData] = useState(selectedRow);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [isDone, setIsDone] = useState(null);

    const handleUpdate = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    }

    const Fermer = () => {
        if(isDone){
            setMessage(null);
            setIsDone(null);
            handleClose();
            window.location.reload();
            return;
        }
        setMessage(null);
        setIsDone(null);
    }
  
    const handleSubmit = async() => {
        setLoading(true);
        // Vérifier si le formulaire est valide
        if (formData.grade === "" || formData.grade === null) {
            alert("Veuillez remplir tous les champs.");
            return; 
        }
        if (formData.grade < 0 || formData.grade > 20) {
            alert("La note doit être comprise entre 0 et 20.");
            return;
        }
        // Envoyer les données au serveur
        try {
            const res = await api.put('/teacher/grades', formData);
            console.log('Données mises à jour avec succès :', res.data);
            setIsDone(true);
            setMessage("Note modifiée avec succès");
        } catch (error) {
            setIsDone(false);
            const errorMessage = error.response?.data?.message || 'Erreur inconnue';
            console.error('Erreur lors de la mise à jour des données :', error);
            setMessage("Erreur lors de la mise à jour des données : " + errorMessage);
        } finally {
            setLoading(false); // Arrêter le chargement
        }
    };

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded shadow-xl w-full max-w-xl">
            <h2 className="text-lg font-bold mb-2 flex justify-center">Modifier la note</h2>
            <table className="text-lg pt-3">
                <tbody>
                    {head.map(({ key, label }, index) => (
                    <tr key={index} className="mb-1">
                        <td>
                            <strong>{label}:</strong>
                        </td>
                        <td className='px-5 py-1'>
                            {key === 'grade' ? (
                                <input type="text" value={formData[key]} onChange={(e) => {handleUpdate(key, e.target.value)}} 
                                className="border px-2 py-1 rounded w-full" min="0" max="20"/>
                            ) : (<span>{formData[key]}</span>)
                            }
                            
                        </td> 
                    </tr>
                    ))}
                </tbody>
                
            </table>
            <div className="flex justify-center mt-4 space-x-4">
                <button onClick={handleClose} className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Fermer
                </button>
                <button onClick={() => handleSubmit()} className={`w-36 mt-4 bg-blue-500 text-white px-3 py-1 rounded flex justify-center items-center transition ${
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
  );
}

export default Grade;