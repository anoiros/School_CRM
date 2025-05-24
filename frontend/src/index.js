import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  // Le Router est ici
import App from './App';
import './index.css'; // Assurez-vous que le chemin est correct

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
      <App />
    </Router>
);
