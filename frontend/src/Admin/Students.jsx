import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TableCRUD from '../layouts/TableCRUD';
import api from '../services/axios';

const Students = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [data, setData] = useState([null]);
    const [userComboBox, setUserComboBox] = useState([null]);
    const [classComboBox, setClassComboBox] = useState([null]);
    const [loading, setLoading] = useState(true); // Pour gérer le chargement
    const [error, setError] = useState(null); // Pour gérer les erreurs

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (!storedUser || storedUser === "undefined") {
            navigate('/');
        }
        
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }

        // Appel API pour récupérer les étudiants
        const fetch = async () => {
            try {
                const response = await api.get('/students');
                const res = await api.get('/select/students');
                const r = await api.get('/select/classes');
                setUserComboBox(res.data);
                setClassComboBox(r.data);
                setData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des étudiants :', error);
                setError('Erreur lors de la récupération des étudiants');
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetch();
    }, [navigate]);
    
    // Si l'utilisateur n'est pas authentifié, rediriger vers la page de login
    if (!user) return (navigate('/'));

    // Si les données sont en cours de chargement
    if (loading) {
        return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                <p className="text-gray-600">Chargement de la page</p>
            </div>
        </div>
        );
    }
      

    // Si une erreur survient lors de la récupération des statistiques
    if (error) {
        return <div className='flex justify-center items-center'>{error}</div>;
    }

    const tableHead = [
        { key: "id", label: "ID", update: false, create:false, defaultValue:'nothing'},
        { key: "username", label: "Nom d'utilisateur", update: false, create:true, inputType:'combobox', options:userComboBox, defaultValue:''},
        { key: "email", label: "E-mail", update: false, create: false, defaultValue:'nothing'},
        { key: "dateNaissance", label: "Date de naissance", update: true, create:true, inputType: "date", defaultValue:"2000-01-01"},
        { key: "genre", label: "Genre", update: true, create:true, inputType: "select", options: ["Homme", "Femme"], defaultValue:"Homme"},
        { key: "classe", label: "Classe", update: false, create:true, inputType: "combobox", options:classComboBox, defaultValue:''},
        { key: "section", label: "section", update: false, create:false, defaultValue:'nothing'},
        { key: "dateInscription", label: "Date d'inscription", update:true, create:true, inputType: "date", defaultValue:'2015-01-01'},
    ];


    return (
        <>
        <TableCRUD head={tableHead} content={data} apiEndpoint={"/students"}>
            List des étudiants
        </TableCRUD>
        </>
    );
}

export default Students;