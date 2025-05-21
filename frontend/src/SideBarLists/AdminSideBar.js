import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import GroupIcon from '@mui/icons-material/Group';
import { Logs } from 'lucide-react';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';



export const AdminSideBar = [
    {
        id: 1,
        title : "Dashboard",
        icon : <DashboardIcon />,
        path : "/admin/dashboard",
    },

    {
        id: 2,
        title : "Étudiants",
        icon : <FaUserGraduate />,
        path : "/admin/students",
    },

    {
        id: 3,
        title : "Enseignants",
        icon : <FaChalkboardTeacher />,
        path : "/admin/teachers",
    },

    {
        id: 4,
        title : "Classes",
        icon : <ClassIcon />,
        path : "/admin/Classes",
    }, 
    
    {
        id: 5,
        title : "Matières",
        icon : <SubjectIcon />,
        path : "/admin/subjects",
    },

    {
        id: 6,
        title : "Utilisateurs & rôles",
        icon : <GroupIcon />,
        path : "/admin/users",
    },

    {
        id: 7,
        title : "Activités",
        icon : <Logs />,
        path : "/admin/logs",
    },

    {
        id: 8,
        title : "Exporter des données",
        icon : <FolderIcon />,
        path : "/admin/export",
    },

    {
        id: 9,
        title : "Paramètres",
        icon : <SettingsIcon />,
        path : "/admin/settings",
    }
]