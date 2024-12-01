import React from "react";
import AutorizarModal from "../components/modalAutorizar.jsx";

function Usuario() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold text-black">
        Solicitudes de Cambio - Admin
      </h1>
      <AutorizarModal />
    </div>
  );
}

export default Usuario;
