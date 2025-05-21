import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));; // Récupère l'utilisateur depuis localStorage

  // Si l'utilisateur n'est pas connecté
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si l'utilisateur n'a pas le rôle requis
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
