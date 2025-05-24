import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/axios';
import ReadTable from '../layouts/ReadTable';

const Grades = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [data, setData] = useState([null]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
  
        const fetch = async () => {
            try {
                const response = await api.get(`admin/student/${id}`);
                setData(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des notes de l\'étudiant :', error);
                setError('Erreur lors de la récupération des notes de l\'étudiant');
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

    const headGrade = [
        { key: "subject", label: "Matière"},
        { key: "teacher", label: "Enseignant"},
        { key: "classe", label: "Classe"},
        { key: "section", label: "Section"},
        { key: "grade", label: "Note"},
        { key: "statue", label: "statue"},
    ]

    const headNote = [
        { key: "teacher", label: "Enseignant"},
        { key: "content", label: "label"},
        { key: "category", label: "Catégorie"},
        ]

  
    return (
        <>
        <ReadTable head={headNote} data={data.notes} title={`Remarque sur l'étudiant de ID : ${id}`} />
        <ReadTable head={headGrade} data={data.grades} title={`Note de l'étudiant de ID : ${id}`} />
        </>
    );
}

export default Grades