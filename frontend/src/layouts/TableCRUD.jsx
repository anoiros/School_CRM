import { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import View from './table/View';
import Update from './table/Update';
import Delete from './table/Delete';
import Create from './table/Create';
import Export from './table/Export';

const TableCRUD = ({ children, head = [], content = [], apiEndpoint, moreAction, moreActionName, exportData }) => {
    const [mode, setMode] = useState(null); // 'view' | 'update' | 'delete' | 'add'
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');  

    const addButtonRef = useRef(null);
    const location = useLocation();


    useEffect(() => {
        const shouldAutoClick = new URLSearchParams(location.search).get("autoclick") === "true";
        if (shouldAutoClick && addButtonRef.current) {
          addButtonRef.current.click();
        }
      }, [location]);

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

    const onSuccess = () => {
        setMode(null);
        const url = new URL(window.location.href);
        url.searchParams.set("autoclick", "false");
        window.history.replaceState({}, "", url);
        window.location.reload();
    }

    const handleClose = () => {
        setMode(null);
        const url = new URL(window.location.href);
        url.searchParams.set("autoclick", "false");
        window.history.replaceState({}, "", url);
    }

    const filteredContent = content.filter(item => {
        return head.some(({ key }) => {
            const value = item[key];
            if (value === null || value === undefined) return false;
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });



    return (
    <div className="p-10 shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">{children}</h1>
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center">
                    <input type="text" placeholder="Rechercher..." className="border px-4 py-2 rounded w-72 h-12" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                </div>
                <div className="flex items-right space-x-4">
                {exportData && (
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2" onClick={() => setMode('export')}>
                        Exporter
                    </button>
                )}
                <button ref={addButtonRef} onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Ajouter
                </button>
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
                                <button onClick={() => handleView(item)} className="text-blue-500 hover:underline mr-2">
                                    Voir
                                </button>
                                <button onClick={() => handleUpdate(item)} className="text-green-500 hover:underline mr-2">
                                    Modifier
                                </button>
                                <button onClick={() => handleDelete(item)} className="text-red-500 hover:underline">
                                    Supprimer
                                </button>
                                {moreAction && (
                                    <button onClick={() => moreAction(item)} className="text-yellow-500 hover:underline ml-2">
                                        {moreActionName}
                                    </button>
                                )}
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
        </div>

        {/* View Modal */}
        {mode === 'view' && selectedRow && (
            <View head={head} selectedRow={selectedRow} handleClose={() => handleClose()} handleUpdate={() => handleUpdate(selectedRow)}/>
        )}
        
        {/* update Modal */}
        {mode === 'update' && selectedRow && (
            <Update head={head} selectedRow={selectedRow} handleClose={() => handleClose()} apiEndpoint={apiEndpoint} onSuccess={() => onSuccess()}/>
        )}
        
        {/* Delete Modal */}
        {mode === 'delete' && selectedRow && (
            <Delete head={head} selectedRow={selectedRow} handleClose={() => handleClose()} apiEndpoint={apiEndpoint} onSuccess={() => onSuccess()}/>
        )}
        
        {/* Create Modal */}
        {mode === 'add' && (
            <Create head={head} handleClose={() => handleClose()} apiEndpoint={apiEndpoint} onSuccess={() => onSuccess()}/>
        )}
        {/* Export Modal */}
        {mode === 'export' && (
            <Export head={head} content={content} title={children} handleClose={() => handleClose()}/>
        )}
    </div>
    );
};

export default TableCRUD;
