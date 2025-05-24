import React from 'react'

const ReadTable = ({ head,data, title}) => {
    return (
        <>
        <div className="p-10 shadow-md rounded-lg">
            <h1 className="text-xl font-bold mb-4">{title}</h1>
            <div className="overflow-x-auto shadow-md rounded-lg bg-white"></div>
                <table className="min-w-full border">
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
        </div>
        </>
    );
}

export default ReadTable;