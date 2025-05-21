import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../services/axios';
import Stats from '../layouts/Stats';

const Dashboard = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser || storedUser === "undefined") {
      navigate('/');
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetch = async () => {
      try {
          const responseStats = await api.get('/stats/teacher');
          setStats(responseStats.data);
          console.log(responseStats.data);
      } catch (error) {
          console.error('Erreur lors de la récupération des statistiques :', error);
          setError('Erreur lors de la récupération des statistiques');
          
      }
    };

    fetch();
    setLoading(false);
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
  
  return (
    <>
    {stats && (
      <>
        <div className='flex gap-4 w-full justify-center items-center'>
          <Stats icon="🏫" total={stats.MyClasses}>Mes Classes</Stats>
          <Stats icon="🎓" total={stats.MyStudents}>Mes Étudiants</Stats>
          <Stats icon="📘" total={stats.MySubjects}>Mes Matières</Stats>
        </div>
      </>
    )}
    </>
    );
}

export default Dashboard;