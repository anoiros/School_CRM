import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Bulletin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [avg, setAvg] = useState(0);
  const [message, setMessage] = useState(null);

  useEffect(() => {

    const fetch = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      try {
        const response = await api.get('/student/subjects');
        setData(response.data);
        const res = await api.get('/student/moyenne');
        setAvg(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des notes :', error);
        setError('Erreur lors de la récupération des notes');
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

  const head = [
    { key:"subject", label: "Matière" },
    { key:"teacher", label: "Professeur" },
    { key:"note", label: "Note" },
    { key:"statue", label: "Statut"},
  ];

  const handleExport = async () => {
    setLoading(true);
    setMessage(null);

    const input = document.getElementById("table-to-export");
    if (!input) return;

    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth - 20;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("Mon bulletin.pdf");

      setMessage("Export PDF réussi !");
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l’export.");
    }

    setLoading(false);
  }


  const Fermer = () => {
    setMessage(null);
  }

  return (
    <div className="p-10 shadow-md rounded-lg" >
      <div className="overflow-x-auto shadow-md rounded-lg bg-white" >
        <div id="table-to-export">
        <h2 className="text-lg font-semibold p-4">{user.name}</h2>
        <table className="min-w-full border" >
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
            {Array.isArray(data) &&
              data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {head.map(({ key }, colIndex) => (
                    <td key={colIndex} className="border px-4 py-2">
                      {item[key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        <div className="p-4">
          <div><strong>Total des matières :</strong> {data.length}</div>
          <div><strong>Moyenne géneral : </strong> {avg.moyenne}/20</div>
          <div><strong>Statut :</strong> {avg.moyenne >= 10 ? 'Réussi' : 'Ajourné'}</div>
        </div>
        </div>
        
    </div>
    <div className='flex justify-center items-center p-5'>
      <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2" onClick ={() => handleExport()}>
        Exporter mon bulletin
      </button>
    </div>
    {message && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> 
        <div className="bg-white p-10 rounded shadow-xl w-full max-w-xl">
          <h2 className="text-lg font-bold mb-2 flex justify-center text-red-600">  Message </h2>
          <div className="flex justify-center mt-4 space-x-4">
            <span>
              {message}
            </span>
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


export default Bulletin;