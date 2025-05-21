import { useState } from 'react';
import View from './table/View';
import Update from './table/Update';
import Delete from './table/Delete';
import Create from './table/Create';

const TableCRUD = ({ children, head = [], content = [], apiEndpoint, moreAction, moreActionName }) => {
    const [mode, setMode] = useState(null); // 'view' | 'update' | 'delete' | 'add'
    const [selectedRow, setSelectedRow] = useState(null);


    const handleView = (item) => {
        setSelectedRow(item);
        setMode('view');
    };

    const handleUpdate = (item) => {
        setSelectedRow(item);
        setMode('update');
    };

    const handleDelete = (item) => {
        setSelectedRow(item);
        setMode('delete');
    };

    const handleAdd = () => {
        setSelectedRow(null);
        setMode('add');
    };

    return (
    <div className="p-10 shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">{children}</h1>
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center">
                    <input type="text" placeholder="Rechercher..." className="border px-4 py-2 rounded w-72 h-12"/>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">
                        Rechercher
                    </button>
                </div>
                <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Ajouter
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
                    {Array.isArray(content) &&
                        content.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {head.map(({ key }, colIndex) => (
                                <td key={colIndex} className="border px-4 py-2">
                                    {item[key]}
                                </td>
                            ))}
                            <th className="border px-4 py-2 font-normal">
                                <button onClick={() => handleView(item)} className="text-blue-500 hover:underline mr-2">
                                    View
                                </button>
                                <button onClick={() => handleUpdate(item)} className="text-green-500 hover:underline mr-2">
                                    Update
                                </button>
                                <button onClick={() => handleDelete(item)} className="text-red-500 hover:underline">
                                    Delete
                                </button>
                                {moreAction && (
                                    <button onClick={() => moreAction(item)} className="text-yellow-500 hover:underline ml-2">
                                        {moreActionName}
                                    </button>
                                )}
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* View Modal */}
        {mode === 'view' && selectedRow && (
            <View head={head} selectedRow={selectedRow} handleClose={() => setMode(null)} handleUpdate={() => handleUpdate(selectedRow)}/>
        )}
        
        {/* update Modal */}
        {mode === 'update' && selectedRow && (
            <Update head={head} selectedRow={selectedRow} handleClose={() => setMode(null)} apiEndpoint={apiEndpoint} onSuccess={() => window.location.reload()}/>
        )}
        
        {/* Delete Modal */}
        {mode === 'delete' && selectedRow && (
            <Delete head={head} selectedRow={selectedRow} handleClose={() => setMode(null)} apiEndpoint={apiEndpoint} onSuccess={() => window.location.reload()}/>
        )}
        
        {/* Create Modal */}
        {mode === 'add' && (
            <Create head={head} handleClose={() => setMode(null)} apiEndpoint={apiEndpoint} onSuccess={() => window.location.reload()}/>
        )}
    </div>
    );
};

export default TableCRUD;
