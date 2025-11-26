"use client";
import PEIForm from "@/components/PeiForm";
import React, { useState } from "react";

interface PEI {
  id_pei: number;
  anio_ini: string;
  anio_fin: string;
  observaciones: string;
  meta_total: number;
  ejecucion: number;
  activo: boolean;
}

export default function PEIList() {
  const [peis, setPeis] = useState<PEI[]>([
    {
      id_pei: 2,
      anio_ini: "1 de enero de 2025",
      anio_fin: "31 de diciembre de 2025",
      observaciones: "",
      meta_total: 1000000,
      ejecucion: 750000,
      activo: true,
    },
    {
      id_pei: 1,
      anio_ini: "1 de enero de 2026",
      anio_fin: "31 de diciembre de 2030",
      observaciones: "",
      meta_total: 0,
      ejecucion: 0,
      activo: true,
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredPEIs = peis.filter(
    (p) =>
      p.anio_ini.toLowerCase().includes(search.toLowerCase()) ||
      p.anio_fin.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPEI = (newPEI: PEI) => {
    setPeis([newPEI, ...peis]);
    setShowModal(false);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">PEIs</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
        >
          <span>➕</span> Añadir PEI
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por año inicial o final"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Año Ini</th>
              <th className="px-4 py-2 border">Año Fin</th>
              <th className="px-4 py-2 border">Meta Total</th>
              <th className="px-4 py-2 border">Ejecución</th>
              <th className="px-4 py-2 border">Activo</th>
            </tr>
          </thead>
          <tbody>
            {filteredPEIs.map((p) => (
              <tr key={p.id_pei} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">{p.id_pei}</td>
                <td className="px-4 py-2 border">{p.anio_ini}</td>
                <td className="px-4 py-2 border">{p.anio_fin}</td>
                <td className="px-4 py-2 border text-right">{p.meta_total}</td>
                <td className="px-4 py-2 border text-right">{p.ejecucion}</td>
                <td className="px-4 py-2 border text-center">
                  {p.activo ? "✅" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
            <PEIForm/>
          </div>
        </div>
      )}
    </div>
  );
}
