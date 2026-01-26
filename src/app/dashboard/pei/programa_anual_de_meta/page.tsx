"use client";

import { useEffect, useState } from "react";
import { useProgramacionMetaAnual } from "@/modules/pei/hooks/useProgramacionMetaAnual";
import type { ProgramacionMetaAnual } from "@/modules/pei/types/programacionMetaAnual.types";
import { Pencil, Trash2, Save, X, Calendar, TrendingUp } from "lucide-react";

export default function ProgramacionMetaAnualPage() {
  const {
    data,
    loading,
    error,
    loadAll,
    update,
    delete: deleteProg,
  } = useProgramacionMetaAnual();

  const [indicadores, setIndicadores] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingProgId, setEditingProgId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Agrupar programaciones por indicador
  useEffect(() => {
    if (data.length > 0) {
      const grouped = data.reduce((acc: any, prog: ProgramacionMetaAnual) => {
        const indicadorId = prog.idIndicadorPeiImp.id;
        if (!acc[indicadorId]) {
          acc[indicadorId] = {
            ...prog.idIndicadorPeiImp,
            programaciones: [],
          };
        }
        acc[indicadorId].programaciones.push(prog);
        return acc;
      }, {});

      setIndicadores(Object.values(grouped));
    }
  }, [data]);

  const handleExpandToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEditStart = (prog: ProgramacionMetaAnual) => {
    setEditingProgId(prog.id);
    setEditValue(prog.programado.toString());
  };

  const handleEditSave = async (prog: ProgramacionMetaAnual) => {
    setSaving(true);
    try {
      await update(prog.id, { programado: parseFloat(editValue) });
      setEditingProgId(null);
      setEditValue("");
    } catch (error: any) {
      alert("Error al actualizar: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEditCancel = () => {
    setEditingProgId(null);
    setEditValue("");
  };

  const handleDelete = async (prog: ProgramacionMetaAnual) => {
    if (!confirm(`¿Eliminar la programación del año ${prog.anio}?`)) return;

    try {
      await deleteProg(prog.id);
    } catch (error: any) {
      alert("Error al eliminar: " + error.message);
    }
  };

  const getProgress = (lineaBase: number, meta: number, programado: number) => {
    const total = meta - lineaBase;
    const current = programado - lineaBase;
    return Math.min(Math.max((current / total) * 100, 0), 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="text-slate-600 text-lg">Cargando programaciones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="text-red-600 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Programación de Metas Anuales
          </h1>
          <p className="text-slate-600">
            Gestión de valores programados por indicador PEI
          </p>
        </div>

        <div className="space-y-6">
          {indicadores.map((indicador) => (
            <div
              key={indicador.id}
              className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden transition-all hover:shadow-xl"
            >
              {/* Header del Indicador */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        ID: {indicador.id}
                      </span>
                      <h2 className="text-xl font-bold text-slate-800">
                        {indicador.description}
                      </h2>
                    </div>

                    {indicador.objetivoEstrategico && (
                      <div className="mb-3 px-4 py-2 bg-white rounded-lg border border-blue-200">
                        <p className="text-xs text-slate-500 mb-1">
                          Objetivo Estratégico
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          {indicador.objetivoEstrategico.idOe} -{" "}
                          {indicador.objetivoEstrategico.description}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                        <p className="text-xs text-slate-500 mb-1">
                          Línea Base
                        </p>
                        <p className="text-2xl font-bold text-slate-800">
                          {indicador.lineaBase}
                          <span className="text-sm ml-1 text-slate-500">
                            {indicador.unidadMedida}
                          </span>
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-3 shadow-sm border border-green-200">
                        <p className="text-xs text-slate-500 mb-1">Meta</p>
                        <p className="text-2xl font-bold text-green-600">
                          {indicador.meta}
                          <span className="text-sm ml-1 text-slate-500">
                            {indicador.unidadMedida}
                          </span>
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 col-span-2">
                        <p className="text-xs text-slate-500 mb-1">Fórmula</p>
                        <p className="text-sm font-mono text-slate-700">
                          {indicador.formula}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleExpandToggle(indicador.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    {expandedId === indicador.id ? "Ocultar" : "Ver"}{" "}
                    Programaciones
                    <span className="ml-2 px-2 py-0.5 bg-blue-500 rounded-full text-xs">
                      {indicador.programaciones.length}
                    </span>
                  </button>
                </div>
              </div>

              {/* Tabla de Programaciones */}
              {expandedId === indicador.id && (
                <div className="p-6 bg-slate-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Programaciones Anuales
                    </h3>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200">
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Año
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Valor Programado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Progreso hacia Meta
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {indicador.programaciones.map(
                          (prog: ProgramacionMetaAnual) => (
                            <tr
                              key={prog.id}
                              className="hover:bg-blue-50 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <span className="font-semibold text-slate-800 text-lg">
                                  {prog.anio}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {editingProgId === prog.id ? (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      value={editValue}
                                      onChange={(e) =>
                                        setEditValue(e.target.value)
                                      }
                                      className="w-32 px-3 py-2 border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-bold"
                                      step="0.01"
                                      autoFocus
                                      disabled={saving}
                                    />
                                    <span className="text-sm text-slate-500">
                                      {indicador.unidadMedida}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-lg font-bold text-slate-800">
                                    {prog.programado}
                                    <span className="text-sm ml-2 text-slate-500">
                                      {indicador.unidadMedida}
                                    </span>
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
                                    <div
                                      className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500"
                                      style={{
                                        width: `${getProgress(
                                          indicador.lineaBase,
                                          indicador.meta,
                                          prog.programado,
                                        )}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-sm font-semibold text-slate-600 w-12 text-right">
                                    {Math.round(
                                      getProgress(
                                        indicador.lineaBase,
                                        indicador.meta,
                                        prog.programado,
                                      ),
                                    )}
                                    %
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                  {editingProgId === prog.id ? (
                                    <>
                                      <button
                                        onClick={() => handleEditSave(prog)}
                                        disabled={saving}
                                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Guardar cambios"
                                      >
                                        <Save className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={handleEditCancel}
                                        disabled={saving}
                                        className="p-2 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Cancelar"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => handleEditStart(prog)}
                                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        title="Editar valor programado"
                                      >
                                        <Pencil className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => handleDelete(prog)}
                                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        title="Eliminar programación"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>

                  {indicador.programaciones.length === 0 && (
                    <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200">
                      <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      <p className="font-medium">
                        No hay programaciones anuales registradas
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {indicadores.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <p className="text-slate-500">
              No hay indicadores con programaciones
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
