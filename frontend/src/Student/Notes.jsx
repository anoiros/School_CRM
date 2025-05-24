import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../services/axios';

const Notes = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [data, setData] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');  

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
        const response = await api.get('/student/notes');
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des notes :', error);
        setError('Erreur lors de la récupération des notes');
        setLoading(false);
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

  const head = [
    { key:"teacher", label: "Professeur" },
    { key:"content", label: "Contenue" },
    { key:"category", label: "Catégorie" },
  ];

  const filteredContent = data.filter(item => {
    return head.some(({ key }) => {
      const value = item[key];
      if (value === null || value === undefined) return false;
      return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  return (
    <div className="p-10 shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Liste des matière et notes</h1>
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <input type="text" placeholder="Rechercher..." className="border px-4 py-2 rounded w-72 h-12" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
          </div>
        </div>
        <table className="min-w-full border">
          <thead>
            <tr>
              {head.map(({ label }, index) => (
                <th key={index} className="border px-4 py-2">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredContent) && filteredContent.length > 0 ? (
            filteredContent.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {head.map(({ key }, colIndex) => (
                  <td key={colIndex} className="border px-4 py-2">
                    {item[key]}
                  </td>
                ))}
              </tr>
              ))
            ) : (
              <tr>
                <td colSpan={head.length + 1} className="text-center py-4">Aucun résultat trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  </div>
  );
};

export default Notes;