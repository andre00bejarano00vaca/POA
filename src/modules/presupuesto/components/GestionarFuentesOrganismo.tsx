// // src/components/presupuesto/GestionarFuentesOrganismo.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import { FuenteService } from "@/service/fuente.service";
// import { OrganismoService } from "@/service/organismo.service";
// import type { Fuente } from "@/types/presupuesto/fuente.types";

// interface Props {
//   organismoId: number;
//   fuentesActuales: Fuente[] | null | undefined;
//   onClose: () => void;
//   onUpdate: () => void;
// }

// export default function GestionarFuentesOrganismo({
//   organismoId,
//   fuentesActuales,
//   onClose,
//   onUpdate,
// }: Props) {
//   const [todasLasFuentes, setTodasLasFuentes] = useState<Fuente[]>([]);
//   const [fuenteSeleccionada, setFuenteSeleccionada] = useState<number | null>(
//     null
//   );
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     cargarFuentes();
//   }, []);

//   const cargarFuentes = async () => {
//     try {
//       const data = await FuenteService.listAll(100, 0);
//       setTodasLasFuentes(data.results);
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   const fuentesDisponibles = todasLasFuentes.filter(
//     (fuente) => !fuentesActuales?.some((f) => f.id === fuente.id)
//   );

//   const agregarFuente = async () => {
//     if (!fuenteSeleccionada) return;

//     setLoading(true);
//     setError(null);

//     try {
//       await OrganismoService.addFuenteToOrganismo(
//         organismoId,
//         fuenteSeleccionada
//       );
//       setFuenteSeleccionada(null);
//       onUpdate();
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const quitarFuente = async (fuenteId: number) => {
//     if (!confirm("¿Seguro que deseas quitar esta fuente?")) return;

//     setLoading(true);
//     setError(null);

//     try {
//       await OrganismoService.removeFuenteFromOrganismo(organismoId, fuenteId);
//       onUpdate();
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
//           <h2 className="text-xl font-bold">Gestionar Fuentes del Organismo</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-6">
//           {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//               {error}
//             </div>
//           )}

//           {/* Fuentes Actuales */}
//           <div className="mb-6">
//             <h3 className="font-semibold mb-3">Fuentes Actuales:</h3>
//             {!fuentesActuales || fuentesActuales.length === 0 ? (
//               <p className="text-gray-500 italic">No hay fuentes asignadas</p>
//             ) : (
//               <div className="space-y-2">
//                 {fuentesActuales.map((fuente) => (
//                   <div
//                     key={fuente.id}
//                     className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200"
//                   >
//                     <div>
//                       <span className="font-medium">
//                         Código {fuente.codigo}:
//                       </span>{" "}
//                       <span>{fuente.description}</span>
//                     </div>
//                     <button
//                       onClick={() => quitarFuente(fuente.id)}
//                       disabled={loading}
//                       className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                       title="Quitar fuente"
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Agregar Nueva Fuente */}
//           <div>
//             <h3 className="font-semibold mb-3">Agregar Fuente:</h3>
//             {fuentesDisponibles.length === 0 ? (
//               <p className="text-gray-500 italic">
//                 No hay más fuentes disponibles para agregar
//               </p>
//             ) : (
//               <div className="flex gap-2">
//                 <select
//                   value={fuenteSeleccionada || ""}
//                   onChange={(e) =>
//                     setFuenteSeleccionada(Number(e.target.value))
//                   }
//                   className="flex-1 border border-gray-300 rounded px-3 py-2"
//                   disabled={loading}
//                 >
//                   <option value="">Seleccionar fuente...</option>
//                   {fuentesDisponibles.map((fuente) => (
//                     <option key={fuente.id} value={fuente.id}>
//                       Código {fuente.codigo} - {fuente.description}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   onClick={agregarFuente}
//                   disabled={!fuenteSeleccionada || loading}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
//                 >
//                   {loading ? "Agregando..." : "Agregar"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end">
//           <button
//             onClick={onClose}
//             className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//           >
//             Cerrar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { FuenteService } from "@/modules/presupuesto/services/fuente.service";
import { OrganismoService } from "@/modules/presupuesto/services/organismo.service";
import type { Fuente } from "@/modules/presupuesto/types/fuente.types";

import Button from "@/shared/components/common/Button";
import Alert from "@/shared/components/common/Alert";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  organismoId: number;
  fuentesActuales: Fuente[] | null | undefined;
  onClose: () => void;
  onUpdate: () => void;
}

export default function GestionarFuentesOrganismo({
  organismoId,
  fuentesActuales,
  onClose,
  onUpdate,
}: Props) {
  const [todasLasFuentes, setTodasLasFuentes] = useState<Fuente[]>([]);
  const [fuenteSeleccionada, setFuenteSeleccionada] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [fuenteAEliminar, setFuenteAEliminar] = useState<Fuente | null>(null);

  useEffect(() => {
    cargarFuentes();
  }, []);

  const cargarFuentes = async () => {
    try {
      const data = await FuenteService.listAll(100, 0);
      setTodasLasFuentes(data.results);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fuentesDisponibles = todasLasFuentes.filter(
    (fuente) => !fuentesActuales?.some((f) => f.id === fuente.id)
  );

  const agregarFuente = async () => {
    if (!fuenteSeleccionada) return;

    setLoading(true);
    setError(null);

    try {
      await OrganismoService.addFuenteToOrganismo(
        organismoId,
        fuenteSeleccionada
      );
      setFuenteSeleccionada(null);
      onUpdate();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmarEliminar = (fuente: Fuente) => {
    setFuenteAEliminar(fuente);
    setAlertOpen(true);
  };

  const quitarFuente = async () => {
    if (!fuenteAEliminar) return;

    setLoading(true);
    setError(null);

    try {
      await OrganismoService.removeFuenteFromOrganismo(
        organismoId,
        fuenteAEliminar.id
      );
      onUpdate();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setFuenteAEliminar(null);
    }
  };

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 z-40 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900/30" onClick={onClose} />

        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto z-50">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Gestionar Fuentes del Organismo
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <XMarkIcon className="w-5 h-5" />
            </Button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}

            {/* Fuentes actuales */}
            <div>
              <h3 className="font-medium mb-3">Fuentes actuales</h3>

              {!fuentesActuales || fuentesActuales.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  No hay fuentes asignadas
                </p>
              ) : (
                <div className="space-y-2">
                  {fuentesActuales.map((fuente) => (
                    <div
                      key={fuente.id}
                      className="flex items-center justify-between border rounded-lg px-4 py-2"
                    >
                      <span className="text-sm">
                        <strong>Código {fuente.codigo}:</strong>{" "}
                        {fuente.description}
                      </span>

                      <Button
                        variant="ghost"
                        size="sm"
                        loading={loading}
                        onClick={() => confirmarEliminar(fuente)}
                        icon={TrashIcon}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Agregar fuente */}
            <div>
              <h3 className="font-medium mb-3">Agregar fuente</h3>

              {fuentesDisponibles.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  No hay más fuentes disponibles
                </p>
              ) : (
                <div className="flex gap-3">
                  <select
                    value={fuenteSeleccionada || ""}
                    onChange={(e) =>
                      setFuenteSeleccionada(Number(e.target.value))
                    }
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    disabled={loading}
                  >
                    <option value="">Seleccionar fuente…</option>
                    {fuentesDisponibles.map((fuente) => (
                      <option key={fuente.id} value={fuente.id}>
                        Código {fuente.codigo} - {fuente.description}
                      </option>
                    ))}
                  </select>

                  <Button
                    variant="primary"
                    onClick={agregarFuente}
                    loading={loading}
                    disabled={!fuenteSeleccionada}
                  >
                    Agregar
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end">
            <Button variant="secondary" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>

      {/* Alert confirmación */}
      <Alert
        type="warning"
        title="Quitar fuente"
        message={`¿Deseas quitar la fuente "${fuenteAEliminar?.description}" del organismo?`}
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        confirmText="Quitar"
        cancelText="Cancelar"
        onConfirm={quitarFuente}
      />
    </>
  );
}
