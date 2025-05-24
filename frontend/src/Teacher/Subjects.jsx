import React , { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';
import Stats from '../layouts/Stats';

const Subjects = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {

    const fetch = async () => {
      try {
        const response = await api.get('/teacher/subjects');
        const responseStats = await api.get('/stats/teacher');
        setStats(responseStats.data);
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des matière :', error);
        setError('Erreur lors de la récupération des matière');
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
      {data.map((subject, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
          <div className="bg-white shadow-md rounded-xl p-6 mb-4 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold mb-2">{subject.name}</h2>
            <strong className="text-gray-700">Classe associée:</strong>
            <p className="text-gray-600">ID : {subject.classe_id}</p>
            <p className="text-gray-600">Nom : {subject.classe_name}</p>
            <p className="text-gray-600">Section : {subject.classe_section}</p>
            <p className="text-gray-600">Moyenne général : {subject.classe_avg}/20</p>
            <button onClick={() => navigate(`/teacher/classes/${subject.classe_id}`)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Voir classe
            </button>
          </div>
        </div>
      ))
    }
    </div>
    </>
  );
};

export default Subjects;