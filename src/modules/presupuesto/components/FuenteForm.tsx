"use client";
import React, { useState } from "react";

const FuenteForm = () => {
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!codigo.trim()) {
      setError("El código es obligatorio");
      return false;
    }
    
    if (!descripcion.trim()) {
      setError("La descripción es obligatoria");
      return false;
    }
    
    if (codigo.length > 20) {
      setError("El código no puede exceder 20 caracteres");
      return false;
    }
    
    if (descripcion.length > 500) {
      setError("La descripción no puede exceder 500 caracteres");
      return false;
    }
    
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    console.log({
      codigo: codigo.trim(),
      descripcion: descripcion.trim(),
    });
    
    // Aquí va tu lógica para enviar a la API
    // Ejemplo:
    // fetch('/api/fuentes', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ codigo, descripcion })
    // })
    
    // Limpiar formulario después de enviar
    setCodigo("");
    setDescripcion("");
    
    alert("Fuente creada exitosamente");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario de Fuente</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Campo: Código */}
        <div>
          <label className="block font-medium mb-1">
            Código <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => {
              setCodigo(e.target.value);
              if (error) setError("");
            }}
            placeholder="Ej: FU-2024-001"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={20}
          />
          <p className="text-sm text-gray-500 mt-1">Máximo 20 caracteres</p>
        </div>

        {/* Campo: Descripción */}
        <div>
          <label className="block font-medium mb-1">
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => {
              setDescripcion(e.target.value);
              if (error) setError("");
            }}
            rows={4}
            placeholder="Descripción detallada de la fuente..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={500}
          />
          <p className="text-sm text-gray-500 mt-1">Máximo 500 caracteres</p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Guardar Fuente
          </button>
        </div>
      </form>
    </div>
  );
};

export default FuenteForm;