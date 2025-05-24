import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../services/axios';
import TableCRUD from '../layouts/TableCRUD';

const Notes = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [data, setData] = useState([null]);
  const [comboBoxData, setComboBoxData] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const response = await api.get('/teacher/notes');
        setData(response.data);
        console.log(response.data);
        const res = await api.get('/teacher/MyStudents');
        setComboBoxData(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des classes :', error);
        setError('Erreur lors de la récupération des classes');
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
    { key:'id' , label: 'ID', update: false, create: false, defaultValue:'nothing' },
    { key:'student_id' , label: 'ID de l\'élève', update: false, create: false, defaultValue:'nothing' },
    { key:'student_name' , label: 'Nom de l\'élève', update: false, create: true, inputType:'combobox', options:comboBoxData, defaultValue:'nothing' },
    { key:'student_email' , label: 'Email de l\'élève', update: false, create: false, defaultValue:'nothing' },
    { key:'content', label: 'Remarque', update: true, create: true, inputType: "text", defaultValue:'' },
    { key:'category', label: 'Catégorie', update: true, create: true, inputType: "select", options: ["positive", "neutral", "negative"], defaultValue:"positive" },
  ]

  return (
    <>
    <TableCRUD head={head} content={data} apiEndpoint={"/notes"} exportData={true}>
      Liste de mes remarques
    </TableCRUD>
    </>
  );
}

export default Notes;