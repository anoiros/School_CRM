import React from 'react';
import { FaChalkboardTeacher, FaBookOpen, FaCommentDots} from 'react-icons/fa';



export const TeacherSideBar = [
    {
        id: 1,
        title : "Mes classes",
        icon : <FaChalkboardTeacher />,
        path : "/teacher/classes",
    },
    
    {
        id: 2,
        title : "Mes matières",
        icon : <FaBookOpen />,
        path : "/teacher/subjects",
    },
    
    {
        id: 3,
        title : "Consulter les remarques",
        icon : <FaCommentDots />,
        path : "/teacher/notes",
    },

]