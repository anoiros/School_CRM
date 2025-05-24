import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stats from '../layouts/Stats';
import Chart from './Dashboard/Chart';
import LinkButton from './Dashboard/LinkButton';
import QuickActions from './Dashboard/QuickActions';
import Logs from './Logs';
import api from '../services/axios';

const Dashboard = () => {

    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [data, setData] = useState([null]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Appel API pour récupérer les statistiques
        const fetch = async () => {
            try {
                const responseStats = await api.get('/stats');
                setStats(responseStats.data);

                const responseData = await api.get('/stats/grades');
                setData(responseData.data);

                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des statistiques :', error);
                setError('Erreur lors de la récupération des statistiques');
                setLoading(false);
            }
        };

        fetch();
    }, [navigate]);

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

    return (
        <>
        {/* Affichage des statistiques */}
            {stats && (
                <>
                    <div className='flex gap-4 w-full justify-center items-center'>
                        <Stats icon="🎓" total={stats.students}>Total Étudiants</Stats>
                        <Stats icon="👩‍🏫" total={stats.teachers}>Total Enseignants</Stats>
                        <Stats icon="🏫" total={stats.classes}>Total Classes</Stats>
                        <Stats icon="📘" total={stats.subjects}>Total Matières</Stats>
                    </div>
                </>
            )}

        
            <div className='flex'>
                {/* Affichage de la répartition des notes*/}
                <div className=' w-1/2 p-5'>
                    <Chart data={data}>
                        Répartition des notes
                    </Chart>
                </div>
                
                {/* Affichage des actions rapides */}
                <div className=' w-1/2 p-5'>
                    <QuickActions>
                        <LinkButton to="/admin/users" icon="👤">Ajouter un utilisateur</LinkButton>
                        <LinkButton to="/admin/students" icon="👩‍🎓">Ajouter un étudiant</LinkButton>
                        <LinkButton to="/admin/teachers" icon="👨‍🏫">Ajouter un enseignant</LinkButton>
                        <LinkButton to="/admin/classes" icon="🏫">Créer une classe</LinkButton>
                        <LinkButton to="/admin/subjects" icon="📘">Ajouter une matière</LinkButton>
                    </QuickActions>
                </div>
            </div>   

            {/* Affichage des dernières actions */}
            <div className=' w-full p-5'>
                <Logs lastest = {true} />
            </div>
        
        </>
    );
}

export default Dashboard;
