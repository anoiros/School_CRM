import { FaHome, FaBook, FaCommentDots, FaFilePdf } from "react-icons/fa";

export const StudentSideBar = [

    {
        id: 1,
        title: "Dashboard",
        icon: <FaHome />,
        path: "/student/dashboard",
    },

    {
        id: 2,
        title: "Mes matières",
        icon: <FaBook />,
        path: "/student/subjects",
    },

    {
        id: 3,
        title: "Remarques",
        icon: <FaCommentDots />,
        path: "/student/notes",
    },

    {
        id: 4,
        title: "Mon bulletin",
        icon: <FaFilePdf />,
        path: "/student/bulletin",
    },


];
