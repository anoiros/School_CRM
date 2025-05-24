import React from "react";
import TableCRUD from "../layouts/TableCRUD";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";

const Users = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [data, setData] = useState([null]);
    const [loading, setLoading] = useState(true); // Pour gérer le chargement
    const [error, setError] = useState(null); // Pour gérer les erreurs

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (!storedUser || storedUser === "undefined") {
            navigate('/');
        }
        
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Appel API pour récupérer les utilisateurs
        const fetch = async () => {
            try {
                const response = await api.get('/users');
                setData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
                setError('Erreur lors de la récupération des utilisateurs');
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetch();
     }, [navigate]);

    // HEADER DE LA TABLE
    const head = [
        { key: 'id', label: 'ID', update: false, create: false , defaultValue:'nothing' },
        { key: 'name', label: "Nom de l'utilisateur", update: true, create: true },
        { key: 'email', label: 'Email', update: true, create: true },
        { key: 'role', label: 'Rôle', update: true, create: true, inputType: "select", options: ["admin", "teacher", "student"], defaultValue:"admin" },
    ];

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

    // Fonction pour réinitialiser le mot de passe
    const resetPassword = async (item) => {
        try {
            console.log(item);
            const response = await api.put(`/users/${item.id}`,{ password: "password"});
            alert(response.data.message);
        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe :', error);
            alert('Erreur lors de la réinitialisation du mot de passe');
        }
    };

    return (
        <>
            <TableCRUD head={head} content={data} apiEndpoint={"/users"} moreAction={resetPassword} moreActionName={"Réinitialiser le MDP"} exportData={true}>
                Liste des utilisateurs
            </TableCRUD>
        </>
    );    
}

export default Users;