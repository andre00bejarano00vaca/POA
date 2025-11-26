"use client";
import React, { useState } from "react";

interface GenericListProps {
  title: string;
  columns: { key: string; header: string }[];
  data: any[];
  FormComponent: React.ComponentType<{ onSubmit: (data: any) => void }>;
}

export default function GenericList({
  title,
  columns,
  data,
  FormComponent,
}: GenericListProps) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState(data);

  const filtered = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (newItem: any) => {
    setItems([newItem, ...items]);
    setShowModal(false);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow"
        >
          ➕ Añadir
        </button>
      </div>

      {/* BUSCADOR */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        />
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="w-full table-auto text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left font-semibold text-gray-800 uppercase tracking-wider border-b border-gray-200"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {filtered.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 text-gray-700 text-center"
                  >
                    {item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
            >
              ✖
            </button>

            <FormComponent onSubmit={handleAdd} />
          </div>
        </div>
      )}
    </div>
  );
}
