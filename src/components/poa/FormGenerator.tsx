"use client";

import { GraphQLClient } from "graphql-request";
import { useState } from "react";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_URL!);

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "textarea" | "select" | "reference";
  required?: boolean;
  options?: { id: number; label: string }[];
  query?: string; // GraphQL query para referencias
  queryLabelPath?: string; // path del label: ej: "data.pei.descripcion"
  queryIdPath?: string;       // path del id: ej: "id"

}

interface FormGeneratorProps {
  title: string;
  fields: FieldConfig[];
  mutation: string;             // <--- MUTATION GRAPHQL
  onCompleted?: (result: any) => void;
}

export default function FormGenerator({
  title,
  fields,
  mutation,
  onCompleted,
}: FormGeneratorProps) {
  const initial = Object.fromEntries(fields.map((f) => [f.name, ""]));

  const [formData, setFormData] = useState(initial);
  const [suggestions, setSuggestions] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const executeReferenceQuery = async (field: FieldConfig, search: string) => {
    if (!field.query || search.trim() === "") return;

    const result = await client.request(field.query, { search });

    const items = eval("result." + field.queryLabelPath); // ejemplo: result.peiList

    setSuggestions((prev) => ({ ...prev, [field.name]: items }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const variables = { input: formData };

      const result = await client.request(mutation, variables);

      onCompleted?.(result);

      alert("Guardado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al enviar datos");
    }

    setLoading(false);
  };

  return (
    <form
      className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-5"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold">{title}</h2>

      {fields.map((f) => (
        <div key={f.name} className="relative">
          <label className="block text-sm mb-1">{f.label}</label>

          {/* TEXTAREA */}
          {f.type === "textarea" && (
            <textarea
              rows={4}
              required={f.required}
              value={formData[f.name]}
              onChange={(e) => handleChange(f.name, e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          )}

          {/* REFERENCE (AUTOCOMPLETE) */}
          {f.type === "reference" && (
            <div className="relative">
              <input
                value={formData[f.name]}
                onChange={(e) => {
                  handleChange(f.name, e.target.value);
                  executeReferenceQuery(f, e.target.value);
                }}
                placeholder="Buscar..."
                className="w-full border rounded-md px-3 py-2"
              />

              {suggestions[f.name]?.length > 0 && (
                <ul className="absolute bg-white border rounded-md w-full mt-1 shadow z-20 max-h-40 overflow-auto">
                  {suggestions[f.name].map((item: any) => (
                    <li
                      key={item.id}
                      onClick={() => {
                        handleChange(f.name, item.id);
                        setSuggestions((p) => ({ ...p, [f.name]: [] }));
                      }}
                      className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {item.label ?? item.descripcion ?? item.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* SELECT */}
          {f.type === "select" && (
            <select
              value={formData[f.name]}
              required={f.required}
              onChange={(e) => handleChange(f.name, e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Seleccione...</option>
              {f.options?.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.label}
                </option>
              ))}
            </select>
          )}

          {/* INPUT */}
          {["text", "number", "date"].includes(f.type) && (
            <input
              type={f.type}
              required={f.required}
              value={formData[f.name]}
              onChange={(e) => handleChange(f.name, e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
