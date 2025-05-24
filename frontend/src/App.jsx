import React from 'react';
import {Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Les layouts
import Sidebar from './layouts/SideBar';
import GlobalPage from './layouts/GlobalPage';

// composants Admin
import { AdminSideBar } from './SideBarLists/AdminSideBar';
import AdminDashboard from './Admin/Dashboard';
import AdminStudents from './Admin/Students';
import AdminGrades from './Admin/Grades';
import AdminTeachers from './Admin/Teachers';
import AdminClasses from './Admin/Classes';
import AdminSubjects from './Admin/Subjects';
import AdminUsers from './Admin/Users';
import AdminLogs from './Admin/Logs';

// composants Teacher
import { TeacherSideBar } from './SideBarLists/TeacherSideBar';
import TeacherDashboard from './Teacher/Dashboard';
import TeacherClasses from './Teacher/Classes';
import TeacherClassDetails from './Teacher/ClasseDetails';
import TeacherSubjects from './Teacher/Subjects';
import TeacherNotes from './Teacher/Notes';


//composants Student
import { StudentSideBar } from './SideBarLists/StudentSideBar';
import StudentDashboard from './Student/Dashboard';
import StudentNotes from './Student/Notes';
import StudentSubjects from './Student/Subject';
import StudentBulletin from './Student/Bulletin';


// composants globales
import Home from './pages/Home';
import Unauthorized from './components/Unauthorized';
import EditProfile from './components/EditProfil';




const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 

      {/* Route protégée pour les admins */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin"> 
          <GlobalPage sidebar={<Sidebar SideBarList={ AdminSideBar } />} />
        </ProtectedRoute>
        }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="students/:id/grades" element={<AdminGrades />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="classes" element={<AdminClasses />} />
        <Route path="subjects" element={<AdminSubjects />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="logs" element={<AdminLogs lastest={false} />} />
      </Route>

      <Route path="/teacher" element={
        <ProtectedRoute requiredRole="teacher">
          <GlobalPage sidebar={<Sidebar SideBarList={ TeacherSideBar } />}/>
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path='classes' element={<TeacherClasses />}/>
        <Route path="classes/:id" element={<TeacherClassDetails />} />
        <Route path='subjects' element={<TeacherSubjects />}/>
        <Route path='notes' element={<TeacherNotes />}/>
      </Route>

      <Route path="/student" element={
        <ProtectedRoute requiredRole="student">
          <GlobalPage sidebar={<Sidebar SideBarList={ StudentSideBar } />}/>
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path='subjects' element={<StudentSubjects />}/>
        <Route path='notes' element={<StudentNotes />}/>
        <Route path='bulletin' element={<StudentBulletin />}/>
      </Route>
    
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/profil" element={<EditProfile/>} />
    </Routes>
  );
};

export default App;
