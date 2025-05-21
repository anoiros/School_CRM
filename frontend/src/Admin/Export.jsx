import React from "react";
import { useState } from "react";

const Export = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const options = ['Étudiant', 'Enseignant', 'Administrateur'];
  
    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    return (
      <div className="p-4 max-w-sm mx-auto">
        <label htmlFor="role" className="block text-sm font-medium mb-1">
          Choisissez un rôle :
        </label>
        <select
          id="role"
          value={selectedOption}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">-- Sélectionner --</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
  
        {selectedOption && (
          <p className="mt-2 text-green-600">Rôle sélectionné : {selectedOption}</p>
        )}
      </div>
    );
};
  

export default Export;
