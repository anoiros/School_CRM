import React, { useEffect } from "react";
import api from "../services/axios";

function LoginPage() {
  useEffect(() => {
    // test simple vers une route Laravel
    api.get("/")
      .then(res => {
        console.log("Réponse du backend :", res.data);
      })
      .catch(err => {
        console.error("Erreur lors de la connexion au backend :", err);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Connexion React ⇄ Laravel</h1>
    </div>
  );
}

export default LoginPage;
