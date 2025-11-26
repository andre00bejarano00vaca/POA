"use client";
import React, { useEffect, useRef, useState } from "react";

interface Producto {
  id: number;
  descripcion: string;
}

export default function FormAccionEstrategica() {
  // ---- Datos simulados ----
  const productos: Producto[] = [
    { id: 1, descripcion: "Sistema de control académico" },
    { id: 2, descripcion: "Plataforma de gestión de talento humano" },
    { id: 3, descripcion: "Sistema de seguimiento institucional" },
  ];

  // ---- Estados ----
  const [descripcion, setDescripcion] = useState<string>("");
  const [searchProducto, setSearchProducto] = useState<string>("");
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
  const [openProducto, setOpenProducto] = useState<boolean>(false);

  // refs correctamente tipados
  const wrapperProductoRef = useRef<HTMLDivElement | null>(null);
  const inputProductoRef = useRef<HTMLInputElement | null>(null);

  // ---- Filtrado ----
  const filteredProductos = productos.filter((prod) =>
    prod.descripcion.toLowerCase().includes(searchProducto.toLowerCase())
  );

  // ---- Click fuera para cerrar dropdown ----
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // comprueba que wrapper existe y que el target no está dentro
      if (
        wrapperProductoRef.current &&
        !wrapperProductoRef.current.contains(e.target as Node)
      ) {
        setOpenProducto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---- Selección ----
  const handleSelectProducto = (prod: Producto) => {
    setSelectedProducto(prod);
    setSearchProducto(prod.descripcion);
    setOpenProducto(false);
  };

  // ---- Submit ----
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validación simple
    if (!descripcion.trim()) {
      alert("La descripción es requerida.");
      return;
    }
    if (!selectedProducto) {
      alert("Debes seleccionar un producto institucional.");
      return;
    }

    // payload listo para enviar
    const payload = {
      descripcion: descripcion.trim(),
      producto_institucional_id_pi: selectedProducto.id,
    };

    console.log("Enviando payload:", payload);
    // aquí iría fetch/axios POST a tu API
  };

  // ---- Reset opcional al seleccionar manualmente texto vacío ----
  useEffect(() => {
    // si el usuario borra el texto, deselecciona el producto
    if (searchProducto === "") {
      setSelectedProducto(null);
    }
  }, [searchProducto]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Formulario de Acción Estratégica
      </h2>

      {/* Descripción */}
      <div>
          <label className="block font-medium mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            placeholder="Descripción de Acción Estratégica..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

      {/* PRODUCTO INSTITUCIONAL (SELECT BUSCABLE) */}
      <div ref={wrapperProductoRef} className="relative mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Producto institucional
        </label>

        <input
          ref={inputProductoRef}
          type="text"
          placeholder="Buscar producto..."
          value={searchProducto}
          onChange={(e) => {
            setSearchProducto(e.target.value);
            setOpenProducto(true);
          }}
          onFocus={() => setOpenProducto(true)}
          aria-haspopup="listbox"
          aria-expanded={openProducto}
          className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />

        {openProducto && (
          <ul
            role="listbox"
            aria-label="Lista de productos institucionales"
            className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto 
                       bg-white border border-gray-200 rounded-md shadow-md text-sm animate-fadeIn"
          >
            {filteredProductos.length > 0 ? (
              filteredProductos.map((prod) => (
                <li
                  key={prod.id}
                  role="option"
                  aria-selected={selectedProducto?.id === prod.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedProducto?.id === prod.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => handleSelectProducto(prod)}
                >
                  {prod.descripcion}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No se encontraron resultados</li>
            )}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md shadow-sm transition-all"
      >
        Guardar Acción Estratégica
      </button>
    </form>
  );
}
