import React from 'react';
import { useState,useEffect } from 'react';
import api from '../../services/axios';

const Create = ({head,  handleClose, apiEndpoint, onSuccess}) => {

    // Initialiser le formulaire avec les valeurs existantes de head
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [isDone, setIsDone] = useState(null);

    useEffect(() => {
        const initial = {};
        head.forEach(({ key, defaultValue }) => {
            initial[key] = defaultValue !== undefined ? defaultValue : '';
        });
        setFormData(initial);
      }, [head]);

    // Vérifier si le formulaire est valide
    const isValidForm = (formData) => {
        for (const key in formData) {
            if (formData[key] === "" || formData[key] === null) {
                return false; // Si un champ est vide, le formulaire n'est pas valide
            }   
        }
        return true; // Tous les champs sont remplis
    };


    // mettre à jour le formulaire
    const handleAdd = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    }

    const handleConfirm = async () => {
        try {
            // Vérifier si le formulaire est valide
            if (!isValidForm(formData)) {
                setMessage("Veuillez remplir tous les champs.");
                return; 
            }
            setLoading(true); // Démarrer le chargement
            const response = await api.post(apiEndpoint, formData);
            setIsDone(true);
            setMessage('Données Ajouter Avec Succés');
            console.log('Données ajoutée avec succès :', response.data);
        } catch (error) {
            setIsDone(false);
            const errorMessage = error.response?.data?.message || 'Erreur inconnue';
            console.error('Erreur lors de l\'ajout des données :', error);
            setMessage('Erreur lors de l\'ajout des données :' + errorMessage)
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
                <h2 className="text-lg font-bold mb-2 flex justify-center">Ajouter une nouvelle ligne</h2>
                <table className="text-lg pt-3">
                    <tbody>
                        {head.map(({ key, label, create, inputType, options }) => (

                            <tr key={key} className="mb-1">
                                {create ? (
                                    <>
                                    <td>
                                        <strong>{label}:</strong>
                                    </td>
                                    <td>
                                        {inputType === "select" ? (
                                            <select value={formData[key]} onChange={(e) => handleAdd(key, e.target.value)} className="border px-4 py-2 rounded w-72 h-12">
                                                {options.map((option, idx) => (
                                                    <option key={idx} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : inputType === "combobox" ? (
                                            <select value={formData[key]} onChange={(e) => handleAdd(key, e.target.value)} className="border px-4 py-2 rounded w-72 h-12">
                                                <option value="">-- Sélectionner --</option>
                                                {options.map((option) => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.value}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                        <input type={inputType} value={formData[key]} onChange={(e) => handleAdd(key, e.target.value)} className="border px-4 py-2 rounded w-72 h-12"/>
                                        )}
                                    </td>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )}
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
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"/>Chargement...
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

export default Create;