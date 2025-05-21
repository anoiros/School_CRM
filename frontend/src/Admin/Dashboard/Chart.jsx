// src/components/admin/GradeDistributionChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const gradeDescriptions = {
    "A+": { desc: "Excellent (18–20)", style: "text-blue-700" },
    "A":  { desc: "Très bien (16–18)", style: "text-blue-600" },
    "B":  { desc: "Bien (14–16)", style: "text-green-600" },
    "C":  { desc: "Assez bien (12–14)", style: "text-yellow-600" },
    "D":  { desc: "Passable (10–12)", style: "text-orange-600" },
    "F":  { desc: "Insuffisant (0–10)", style: "text-red-600" }
};



const Chart = ({ data, children }) => {
    return (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{children}</h3>
        {data.length === 0 ? (
            <p>Chargement des données...</p>
        ) : (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grades" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        )}
        
        {/* Légende explicative sous le graphique */}
        <div className="mt-4 grid grid-cols-3 gap-4">
            {Object.entries(gradeDescriptions).map(([grade, { desc, style }]) => (
                <div key={grade} className="bg-gray-100 p-2 rounded">
                <p className={`font-semibold ${style}`}>{grade}</p>
                <p className="text-sm text-gray-700">{desc}</p>
                </div>
            ))}
        </div>
    </div>
    );
};

export default Chart;
