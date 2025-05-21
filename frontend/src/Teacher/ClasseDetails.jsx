import React , { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/axios';
import View from '../layouts/table/View';
import Grade from './Grade';

const ClasseDetails = () => {

    const { id } = useParams(); // récupère l'ID de la classe dans l'URL

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [data, setData] = useState([null]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState(null); 
    const [selectedRow, setSelectedRow] = useState(null); // pour stocker la ligne sélectionnée

    const handleView = (row) => {
        setSelectedRow(row);
        setMode('view');
    }

    const handleNoter = (row) => {
        setSelectedRow(row);
        setMode('noter');
    }
  
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
                const response = await api.get(`/teacher/students/${id}`);
                setData(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des étudiant :', error);
                setError('Erreur lors de la récupération des étudiant');
                setLoading(false);
            }
        };
  
        fetch();
    }, [id, navigate]);
    
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
        { key:'id', label: 'ID' },
        { key:'name', label: 'Nom' },
        { key:'email', label: 'Email' },
        { key:'DDN', label: 'Date de naissance' },
        { key:'genre', label: 'Genre' },
        { key:'grade', label: '	Note actuelle' },
    ];
  

    // Tu peux maintenant utiliser `id` pour appeler l'API et afficher les élèves
    return (
    <div className="p-10 shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">Détails de la classe ID : {id}</h1>
        <div className="overflow-x-auto shadow-md rounded-lg bg-white"></div>
        <div className="flex items-center p-4">
            <input type="text" placeholder="Rechercher..." className="border px-4 py-2 rounded w-72 h-12"/>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">
               Rechercher
            </button>
        </div>
        <table className="min-w-full border">
            <thead>
                <tr>
                   {head.map(({ label }, index) => (
                        <th key={index} className="border px-4 py-2">
                            {label}
                        </th>
                    ))}
                    <th className="border px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(data) &&
                    data.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                        {head.map(({ key }, colIndex) => (
                            <td key={colIndex} className="border px-4 py-2">
                                {item[key]}
                            </td>
                         ))}
                        <th className="border px-4 py-2 font-normal">
                            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2' onClick={() => handleView(item)}>
                                Voir
                            </button>
                            <button className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2' onClick={() => handleNoter(item)}>  
                                Noter
                            </button>
                            <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2' onClick={() => navigate(`/teacher/students/${item.id}/remark`)}>
                                Ajouter une remarque
                            </button>
                        </th>
                    </tr>
                ))}
                    
            </tbody>
        </table>
        {/* View Modal */}
        {mode === 'view' && selectedRow && (
            <View head={head} selectedRow={selectedRow} handleClose={() => setMode(null)}/>
        )}
        {/* grade Modal */}
        {mode === 'noter' && selectedRow && (
            <Grade head={head} selectedRow={selectedRow} handleClose={() => setMode(null)}/>
        )}
    </div>
    );
}

export default ClasseDetails;