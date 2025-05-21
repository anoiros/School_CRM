import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../services/axios';

const Update = ({head , selectedRow, handleClose, apiEndpoint, onSuccess}) => {

    // Vérifier si le formulaire est valide
    const isValidForm = (formData) => {
        for (const key in formData) {
            if (formData[key] === "" || formData[key] === null) {
                return false; // Si un champ est vide, le formulaire n'est pas valide
            }   
        }
        return true; // Tous les champs sont remplis
    };
    // formulaire a envoyer
    const [formData, setFormData] = useState(selectedRow);

    // Pour gérer le chargement
    const [loading, setLoading] = useState(false); 

    // initialiser le formulaire
    useEffect(() => {
        setFormData(selectedRow);
    }, [selectedRow]);

    // mettre à jour le formulaire
    const handleUpdate = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    }

    // envoyer le formulaire
    const handleConfirm = async () => {
        try {
            // Vérifier si le formulaire est valide
            if (!isValidForm(formData)) {
                alert("Veuillez remplir tous les champs.");
                return; 
            }
            if (!formData.updateAll) {
                formData.updateAll = true;
            }

            setLoading(true); // Démarrer le chargement
            const response = await api.put(`${apiEndpoint}/${formData.id}`, formData);
            onSuccess(response);
            console.log('Données mises à jour avec succès :', response.data);
            alert("Données mises à jour avec succès");
            handleClose();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erreur inconnue';
            console.error('Erreur lors de la mise à jour des données :', error);
            alert("Erreur lors de la mise à jour des données : " + errorMessage);
        } finally {
            setLoading(false); // Arrêter le chargement
            
        }
    };


    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded shadow-xl w-full max-w-xl">

            <h2 className="text-lg font-bold mb-2 flex justify-center">Modifier la ligne</h2>

            <table className="text-lg pt-3">
                <tbody>
                {head.map(({ key, label, update, inputType, options}, index) => (
                    <tr key={index} className="mb-1">
                        <td>
                            <strong>{label}:</strong> 
                        </td>

                        <td>
                           {update ? (
                            inputType === "select" ? (
                                <select value={formData[key]} onChange={(e) => handleUpdate(key, e.target.value)} 
                                    className="border px-4 py-2 rounded w-72 h-12">

                                    {options.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}

                                </select>
                            ) : (
                                <input type={inputType} value={formData[key]} onChange={(e) => handleUpdate(key, e.target.value)} 
                                    className="border px-4 py-2 rounded w-72 h-12" required/>
                            )
                            ) : (
                            <span className='px-4 py-2 rounded w-72 h-12'>
                                {formData[key]}
                            </span>
                            )}
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
    </div>
  );
}

export default Update;