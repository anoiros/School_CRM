import React from 'react';
import { FaChalkboardTeacher, FaBookOpen, FaCommentDots, FaHome} from 'react-icons/fa';
import FolderIcon from '@mui/icons-material/Folder';



export const TeacherSideBar = [
    {
        id: 1,
        title: "Dashboard",
        icon: <FaHome />,
        path: "/teacher/dashboard",
    },
    {
        id: 2,
        title : "Mes classes",
        icon : <FaChalkboardTeacher />,
        path : "/teacher/classes",
    },
    
    {
        id: 3,
        title : "Mes matières",
        icon : <FaBookOpen />,
        path : "/teacher/subjects",
    },
    
    {
        id: 4,
        title : "Consulter les remarques",
        icon : <FaCommentDots />,
        path : "/teacher/notes",
    },

    {
        id: 5,
        title : "Exporter des données",
        icon : <FolderIcon />,
        path : "/teacher/export",
    },
]