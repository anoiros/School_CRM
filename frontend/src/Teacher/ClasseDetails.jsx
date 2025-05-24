import React , { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/axios';
import View from '../layouts/table/View';
import Grade from './Grade';
import Export from '../layouts/table/Export';

const ClasseDetails = () => {

    const { id } = useParams(); 

    const navigate = useNavigate();
    const [data, setData] = useState([null]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState(null); 
    const [selectedRow, setSelectedRow] = useState(null); 
    const [searchTerm, setSearchTerm] = useState('');

    const handleView = (row) => {
        setSelectedRow(row);
        setMode('view');
    }

    const handleNoter = (row) => {
        setSelectedRow(row);
        setMode('noter');
    }
  
    useEffect(() => {
  
        const fetch = async () => {
            try {
                const response = await api.get(`/teacher/students/${id}`);
                setData(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des étudiants :', error);
                setError('Erreur lors de la récupération des étudiants');
                setLoading(false);
            }
        };
  
        fetch();
    }, [id, navigate]);
    

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
  
    const head = [
        { key:'id', label: 'ID' },
        { key:'name', label: 'Nom' },
        { key:'email', label: 'Email' },
        { key:'DDN', label: 'Date de naissance' },
        { key:'genre', label: 'Genre' },
        { key:'grade', label: '	Note actuelle' },
    ];

    const handleClose = () => {
        setMode(null);
    }
  
    const filteredContent = data.filter(item => {
        return head.some(({ key }) => {
            const value = item[key];
            if (value === null || value === undefined) return false;
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    return (
    <div className="p-10 shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">Détails de la classe ID : {id}</h1>
        <div className="overflow-x-auto shadow-md rounded-lg bg-white"></div>
        <div className="flex items-center p-4">
            <div className="flex items-center">
                <input type="text" placeholder="Rechercher..." className="border px-4 py-2 rounded w-72 h-12" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
            </div>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2" onClick={() => setMode('export')}>
                Exporter
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
                {Array.isArray(filteredContent) && filteredContent.length > 0 ? (
                    filteredContent.map((item, rowIndex) => (
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
                        </th>
                    </tr>
                    ))
                ) : (
                    <tr>
                      <td colSpan={head.length + 1} className="text-center py-4">Aucun résultat trouvé</td>
                    </tr>
                )}   
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
        {/* Export Modal */}
        {mode === 'export' && (
            <Export head={head} content={data} title={`Liste des étudiant de la classe ${id}`} handleClose={() => handleClose()}/>
        )}
    </div>
    );
}

export default ClasseDetails;