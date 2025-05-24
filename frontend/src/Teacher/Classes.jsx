import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../services/axios';
import Stats from '../layouts/Stats';

const Classes = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {

    const fetch = async () => {
      try {
        const response = await api.get('/teacher/classes');
        setData(response.data);
        const responseStats = await api.get('/stats/teacher');
        setStats(responseStats.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des classes :', error);
        setError('Erreur lors de la récupération des classes');
      }
    };

    fetch();
  }, [navigate]);
  

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
    <div className="flex flex-wrap">
      {data.map((classe, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
          <div className="bg-white shadow-md rounded-xl p-6 mb-4 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold mb-2">{classe.name}</h2>
            <p className="text-gray-600">Section : {classe.section}</p>
            <p className="text-gray-600">Nombre d'élèves : {classe.students_count}</p>
            <button onClick={() => navigate(`/teacher/classes/${classe.id}`)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Voir les détails
            </button>
          </div>
        </div>
      ))
    }
    </div>
    </>
  );
};

export default Classes;
