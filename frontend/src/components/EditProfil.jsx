import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';

const EditProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [isDone, setIsDone] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        photo: null,
    });

    const [preview, setPreview] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setFormData((prev) => ({
                ...prev,
                name: parsedUser.name || '',
                email: parsedUser.email || '',
            }));
            setPreview(parsedUser.photoUrl || '');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo') {
            const file = files[0];
            if (preview && preview.startsWith('blob:')) {
                URL.revokeObjectURL(preview);
            }
            setFormData({ ...formData, photo: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            if (formData.password) data.append('password', formData.password);
            if (formData.photo) data.append('photo', formData.photo);

            console.log(data);
            const res = await api.post('/profil', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const updatedUser = res.data;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setIsDone(true);
            setUser(updatedUser);
            setMessage('Profil mis à jour avec succès !');
        } catch (error) {
            setIsDone(false);
            console.error('Erreur lors de la mise à jour du profil :', error);
            setMessage('Erreur lors de la mise à jour du profil.');
        }
    };

    const handleCancel = () => {
        if (preview && preview.startsWith('blob:')) {
            URL.revokeObjectURL(preview);
        }
        navigate(-1);
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="text-gray-600">Chargement du profil...</p>
                </div>
            </div>
        );
    }

    const Fermer = () => {
        setMessage(null);
        if (!isDone) {
            navigate(-1);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Modifier le profil</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center">
                    <img src={preview || '/default-profile.png'} alt="Aperçu" className="w-24 h-24 rounded-full object-cover mb-2"/>
                    <input type="file" name="photo" accept="image/*" onChange={handleChange} />
                </div>
                <div>
                    <label>Nom</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="border w-full px-3 py-2 rounded" />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="border w-full px-3 py-2 rounded" />
                </div>
                <div>
                    <label>Nouveau mot de passe</label>
                    <input type="password"name="password" value={formData.password} onChange={handleChange} className="border w-full px-3 py-2 rounded"/>
                </div>
                <div>
                    <label>Confirmer mot de passe</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="border w-full px-3 py-2 rounded"/>
                </div>

                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Enregistrer
                    </button>
                    <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Annuler
                    </button>
                </div>
            </form>
            {message && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-10 rounded shadow-xl w-full max-w-xl">
                        <h2 className="text-lg font-bold mb-2 flex justify-center text-red-600">
                            Message
                        </h2>
                        <div className="flex justify-center mt-4 space-x-4">
                            <span>{message}</span>
                        </div>
                        <div className="flex justify-center mt-4 space-x-4">
                            <button onClick={() => Fermer()} className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
