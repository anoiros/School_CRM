import React from 'react';
import Home from './pages/Home';
import Reset from './pages/ResetPassword';
import DashBoard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ResetPassword" element={<Reset />} />
        <Route path="/Dashboard" element={<DashBoard />} />
        {/* Tu peux ajouter d’autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;