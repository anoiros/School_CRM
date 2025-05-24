import React,{ useState } from 'react';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const Export = ({head=[], content=[], handleClose, title}) => {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [isDone, setIsDone] = useState(null);
    const [format, setFormat] = useState("pdf");

    const handleConfirm = async () => {
        if (format === "pdf") { // ****************************PDF****************************
          setLoading(true);
          setMessage(null);
          setIsDone(null);
      
          try {
            const doc = new jsPDF();

            const pageWidth = doc.internal.pageSize.getWidth();
            const textWidth = doc.getTextWidth(title);
            const x = (pageWidth - textWidth) / 2;

            doc.setFontSize(16);        
            doc.setFont("helvetica", "bold");
            doc.text(title, x, 15);    
      
            const tableHeaders = head.map(h => h.label);
      
            const tableRows = content.map(row =>
              head.map(h => row[h.key])
            );

            autoTable(doc, {
              head: [tableHeaders],
              body: tableRows,
              startY: 20,
              margin: { top: 20 },
              styles: { fontSize: 9 },
            });
      
            doc.save(`${title}.pdf`);	
            setMessage("Export PDF réussi !");
            setIsDone(true);
          } catch (error) {
            console.error(error);
            setMessage("Erreur lors de l’export PDF.");
            setIsDone(false);
          }
      
          setLoading(false);


        } else if (format === "csv" || format === "xls") { // ****************************CSV ou XLS****************************
            try {
              setLoading(true);
              setMessage(null);
              setIsDone(null);
        
              const worksheetData = [head.map(h => h.label), ...content.map(row => head.map(h => row[h.key]))];
              const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, "Feuille 1");
        
              const fileType = format === "csv" ? "csv" : "xlsx";
              XLSX.writeFile(workbook, `${title}.${fileType}`);
        
              setMessage(`Export ${format.toUpperCase()} réussi !`);
              setIsDone(true);
            } catch (error) {
              console.error(error);
              setMessage("Erreur lors de l’export.");
              setIsDone(false);
            }
        
            setLoading(false);
          }
      
    };
    
    const Fermer = () => {
        if(isDone){
            setMessage(null);
            setIsDone(null);
            handleClose();
            return;
        }
        setMessage(null);
        setIsDone(null);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded shadow-xl w-full max-w-xl">
            <h2 className="text-lg font-bold mb-2 flex justify-center">Exporter des données</h2>
            
            <div className="flex justify-center mt-4 space-x-4">
                <select value={format} onChange={(e) => setFormat(e.target.value)} className="border px-4 py-2 rounded w-72 h-12">
                    <option value="pdf">PDF</option>
                    <option value="xls">Excel</option>
                    <option value="csv">CSV</option>
                </select>

                <button onClick={handleClose} className="w-36 mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Annuler
                </button>

                <button onClick={() => handleConfirm()} className={`w-36 mt-4 bg-blue-500 text-white px-3 py-1 rounded flex justify-center items-center transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`} disabled={loading}>
                    {loading && (
                        <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"/>Chargement...
                        </>
                    )}
                    {loading ? "" : "Confirmer"}
                </button>
            </div>
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
}

export default Export;