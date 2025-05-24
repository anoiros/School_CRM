import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Profil from '../components/Profil';

const SideBar = ({ SideBarList }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <ul className="h-auto w-full p-0 bg-gray-800">
      <li className="border-b border-gray-600 list-none">
        <Profil/>
      </li>

      {/* Liste des liens */}
      {SideBarList.map((item, index) => {
        const isActive = location.pathname.startsWith(item.path);
        return (
          <li
            key={index}
            className={
              "w-full h-16 border-b border-gray-700 list-none flex flex-row " +
              "text-white justify-center items-center font-roboto hover:cursor-pointer hover:bg-[#374151] " +
              (isActive ? "bg-[#374151]" : "")
            }
            onClick={() => handleClick(item.path)}
          >
            <div className="flex-[0_0_30%] grid place-items-center">
              {item.icon}
            </div>
            <div className="flex-[0_0_70%]">
              {item.title}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SideBar;


