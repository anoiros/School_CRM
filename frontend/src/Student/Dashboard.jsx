import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';
import Stats from '../layouts/Stats';

const Dashboard = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [stats, setStats] = useState(null);
    const [classe, setClasse] = useState(null);
  
    useEffect(() => {
  
      const fetch = async () => {
        try {
            const response = await api.get('/student/classes');
            setData(response.data);
            const res = await api.get('/student/moyenne');
            setStats(res.data);
            console.log(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des informations :', error);
            setError('Erreur lors de la récupération des informations');
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
        {
          stats && (
            <div className="flex flex-wrap justify-center mb-4">
                <Stats icon="📊" total={stats.moyenne} >Moyenne Générale</Stats>
            </div>
          )
        }
        <div className="flex flex-wrap">
          {data.map((classe, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
              <div className="bg-white shadow-md rounded-xl p-6 mb-4 flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold mb-2">{classe.name}</h2>
                <p className="text-gray-600">Matière : {classe.subject}</p>
                <p className="text-gray-600">Section : {classe.section}</p>
                <p className="text-gray-600">Ensegnant : {classe.teacher}</p>
                <p className="text-gray-600">Note Actuelle : {classe.note}</p>
                <button onClick={() => setClasse(classe)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
          { classe && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-10 rounded shadow-xl w-full max-w-lg">
                <h2 className="text-lg font-bold mb-2 flex justify-center">Détails de la ligne</h2>
                <table className="text-lg pt-3">
                  <tbody> 
                    <tr><td><strong>Nom:</strong></td><td>{classe.name}</td></tr>
                    <tr><td><strong>Matière:</strong></td><td>{classe.subject}</td></tr>
                    <tr><td><strong>Section:</strong></td><td>{classe.section}</td></tr>
                    <tr><td><strong>Enseignant:</strong></td><td>{classe.teacher}</td></tr>
                    <tr><td><strong>Note:</strong></td><td>{classe.note}</td></tr>
                  </tbody>
                </table>
                <div className="flex justify-center mt-4 space-x-4">
                  <button onClick={() => setClasse(null)} className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        </>
    );
}

export default Dashboard;