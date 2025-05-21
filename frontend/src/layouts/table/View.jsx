import React from 'react'

const View = ({head , selectedRow, handleUpdate, handleClose}) => {
    return (
        
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded shadow-xl w-full max-w-xl">
            <h2 className="text-lg font-bold mb-2 flex justify-center">Détails de la ligne</h2>
            <table className="text-lg pt-3">
                <tbody>
                    {head.map(({ key, label }, index) => (
                    <tr key={index} className="mb-1">
                        <td>
                            <strong>{label}:</strong>
                        </td>
                        <td className='px-5 py-1'>
                            {selectedRow[key]}
                        </td> 
                    </tr>
                    ))}
                </tbody>
                
            </table>
            <div className="flex justify-center mt-4 space-x-4">
                <button onClick={handleClose} className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Fermer
                </button>
                {handleUpdate && (
                    <button onClick={handleUpdate} className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Modifier
                    </button>
                )}
            </div>
        </div>
    </div>
  );
}

export default View;