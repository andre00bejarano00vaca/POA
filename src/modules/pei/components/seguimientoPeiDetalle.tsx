// src/modules/pei/components/SeguimientoPeiDetalle.tsx
"use client";

import { useState, useEffect } from "react";
import Button from "@/shared/components/common/Button";
import Alert from "@/shared/components/common/Alert";
import { useAlert } from "@/shared/hooks/useAlert";
import type {
  SeguimientoPei,
  SeguimientoPeiObjetivo,
  SeguimientoPeiIndicador,
} from "../types/seguimientoPei.types";

// Servicios
import { SeguimientoPeiService } from "../services/seguimientoPei.service";
import { SeguimientoPeiObjetivoService } from "../services/seguimientoPeiObjetivo.service";
import { SeguimientoPeiIndicadorService } from "../services/seguimientoPeiIndicador.service";

interface Props {
  seguimientoId: number;
  onBack: () => void;
}

export default function SeguimientoPeiDetalle({
  seguimientoId,
  onBack,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [seguimiento, setSeguimiento] = useState<SeguimientoPei | null>(null);
  const [objetivos, setObjetivos] = useState<SeguimientoPeiObjetivo[]>([]);
  const [indicadores, setIndicadores] = useState<SeguimientoPeiIndicador[]>([]);
  const [selectedObjetivoId, setSelectedObjetivoId] = useState<number | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"objetivos" | "indicadores">(
    "objetivos",
  );

  const { isOpen, alertConfig, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    loadData();
  }, [seguimientoId]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Cargar datos del seguimiento principal
      const seguimientoData =
        await SeguimientoPeiService.getById(seguimientoId);
      setSeguimiento(seguimientoData);

      // Cargar objetivos relacionados
      const objetivosData =
        await SeguimientoPeiObjetivoService.getBySeguimientoId(seguimientoId);
      setObjetivos(objetivosData);

      // Si hay objetivos, cargar el primero por defecto
      if (objetivosData.length > 0) {
        setSelectedObjetivoId(objetivosData[0].id);
        const indicadoresData =
          await SeguimientoPeiIndicadorService.getByObjetivoId(
            objetivosData[0].id,
          );
        setIndicadores(indicadoresData);
      }
    } catch (error: any) {
      showAlert({
        type: "error",
        title: "Error al cargar datos",
        message: error.message || "No se pudo cargar el seguimiento PEI",
        confirmText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleObjetivoSelect = async (objetivoId: number) => {
    setSelectedObjetivoId(objetivoId);
    try {
      const indicadoresData =
        await SeguimientoPeiIndicadorService.getByObjetivoId(objetivoId);
      setIndicadores(indicadoresData);
    } catch (error: any) {
      showAlert({
        type: "error",
        title: "Error al cargar indicadores",
        message: error.message || "No se pudieron cargar los indicadores",
        confirmText: "Aceptar",
      });
    }
  };

  const getValoracionColor = (valoracion: string) => {
    switch (valoracion) {
      case "Excelente":
        return "bg-green-100 text-green-800 border-green-200";
      case "Bueno":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Regular":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Deficiente":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCumplimientoColor = (porcentaje: number) => {
    if (porcentaje >= 90) return "text-green-600";
    if (porcentaje >= 75) return "text-blue-600";
    if (porcentaje >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="w-full mx-auto p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6 lg:p-10">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Cargando seguimiento PEI...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!seguimiento) {
    return (
      <div className="w-full mx-auto p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6 lg:p-10">
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-600">No se pudo cargar el seguimiento PEI</p>
            <Button variant="secondary" onClick={onBack} className="mt-4">
              ← Volver al Listado
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6 lg:p-10">
        {/* Header con navegación */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
          <Button variant="secondary" onClick={onBack}>
            ← Volver al Listado
          </Button>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Detalle del Seguimiento PEI
          </h1>
        </div>

        {/* Resumen del seguimiento - Usando el mismo estilo que GenericList */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6 border-l-4 border-l-blue-500">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Seguimiento PEI {seguimiento.ano}
                </h2>
                <p className="text-gray-600 mt-1">
                  {seguimiento.pei
                    ? `PEI ${seguimiento.pei.anioIni} - ${seguimiento.pei.anioFin}`
                    : "Sin PEI"}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getValoracionColor(seguimiento.valoracion_global)}`}
              >
                {seguimiento.valoracion_global}
              </span>
            </div>

            {/* Métricas principales - Grid responsive */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-blue-600">
                  {seguimiento.promedio_general.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Promedio General</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-2xl font-bold text-green-600">
                  {seguimiento.porc_alta.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Alta</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-2xl font-bold text-yellow-600">
                  {seguimiento.porc_media.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Media</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-2xl font-bold text-red-600">
                  {seguimiento.porc_baja.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Baja</p>
              </div>
            </div>

            {/* Observaciones */}
            {seguimiento.observaciones && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">
                  Observaciones:
                </h4>
                <p className="text-blue-700 text-sm">
                  {seguimiento.observaciones}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs personalizados - Usando el estilo de Button */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Tab headers */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-2 py-4">
              <Button
                variant={activeTab === "objetivos" ? "primary" : "ghost"}
                onClick={() => setActiveTab("objetivos")}
                size="sm"
              >
                Objetivos Estratégicos ({objetivos.length})
              </Button>
              <Button
                variant={activeTab === "indicadores" ? "primary" : "ghost"}
                onClick={() => setActiveTab("indicadores")}
                size="sm"
              >
                Indicadores ({indicadores.length})
              </Button>
            </div>
          </div>

          {/* Tab content: Objetivos */}
          {activeTab === "objetivos" && (
            <div className="p-6">
              {objetivos.length === 0 ? (
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-500">
                  <p className="font-medium">📋 No hay objetivos registrados</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {objetivos.map((objetivo) => (
                    <div
                      key={objetivo.id}
                      onClick={() => handleObjetivoSelect(objetivo.id)}
                      className={`cursor-pointer border rounded-lg p-4 transition-all hover:shadow-md ${
                        selectedObjetivoId === objetivo.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-blue-300"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-2">
                            {objetivo.objetivo_estrategico?.description ||
                              `Objetivo #${objetivo.id}`}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">
                            {objetivo.objetivo_estrategico?.description ||
                              "Sin descripción"}
                          </p>
                          <div className="flex items-center gap-4">
                            <span
                              className={`text-lg font-bold ${getCumplimientoColor(objetivo.promedio_cumplimiento)}`}
                            >
                              {objetivo.promedio_cumplimiento.toFixed(1)}%
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${getValoracionColor(objetivo.escala_valoracion)}`}
                            >
                              {objetivo.escala_valoracion}
                            </span>
                          </div>
                        </div>
                      </div>
                      {objetivo.valoracion_cualitativa && (
                        <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700 border border-gray-200">
                          {objetivo.valoracion_cualitativa}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab content: Indicadores */}
          {activeTab === "indicadores" && (
            <div className="p-6">
              {selectedObjetivoId && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    Mostrando indicadores del objetivo seleccionado:{" "}
                    <span className="font-medium">
                      {objetivos.find((o) => o.id === selectedObjetivoId)
                        ?.objetivo_estrategico?.description ||
                        "Objetivo seleccionado"}
                    </span>
                  </p>
                </div>
              )}

              {indicadores.length === 0 ? (
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-500">
                  <p className="font-medium">
                    {selectedObjetivoId
                      ? "📋 No hay indicadores para el objetivo seleccionado"
                      : "📋 Seleccione un objetivo para ver sus indicadores"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {indicadores.map((indicador) => (
                    <div
                      key={indicador.id}
                      className="border border-gray-200 rounded-lg p-4 bg-white"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-900">
                          Indicador #{indicador.id}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getValoracionColor(indicador.escala_valoracion)}`}
                        >
                          {indicador.escala_valoracion}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="text-center p-3 bg-blue-50 rounded border border-blue-200">
                          <p className="text-lg font-bold text-blue-600">
                            {indicador.programado}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Programado
                          </p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded border border-green-200">
                          <p className="text-lg font-bold text-green-600">
                            {indicador.ejecutado}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Ejecutado
                          </p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded border border-purple-200">
                          <p
                            className={`text-lg font-bold ${getCumplimientoColor(indicador.grado_cumplimiento)}`}
                          >
                            {indicador.grado_cumplimiento.toFixed(1)}%
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Cumplimiento
                          </p>
                        </div>
                      </div>

                      {indicador.comentarios && (
                        <div className="p-3 bg-gray-50 rounded text-sm text-gray-700 border border-gray-200">
                          <strong>Comentarios:</strong> {indicador.comentarios}
                        </div>
                      )}

                      {indicador.programa_anual_meta && (
                        <div className="mt-2 text-xs text-gray-500">
                          Relacionado con: Meta Anual{" "}
                          {indicador.programa_anual_meta.anio}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Alert usando tu componente existente */}
      <Alert
        isOpen={isOpen}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        confirmText={alertConfig.confirmText}
        onClose={hideAlert}
      />
    </div>
  );
}
