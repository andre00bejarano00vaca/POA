"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X, Save } from "lucide-react";
import { ObjetoGastoService } from "@/modules/presupuesto/services/objetoGasto.service";
import type { ObjetoGasto } from "@/modules/presupuesto/types/objetoGasto.types";

interface PresupuestoRecord {
  id: number;
  codigo: string;
  codPpto: string;
  entidad: string;
  da: string;
  ue: string;
  prog: string;
  nroAct: string;
  descripcionActividad: string;
  fuente: string;
  org: string;
  partida: string;
  descripcionGasto: string;
  entidadTransf: string;
  importe: number;
  objetoGastoId?: number; // Guardar el ID para edición
}

const MatrizPresupuesto = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Estados para el select de ObjetoGasto
  const [objetosGasto, setObjetosGasto] = useState<ObjetoGasto[]>([]);
  const [loadingObjetos, setLoadingObjetos] = useState(false);

  const [records, setRecords] = useState<PresupuestoRecord[]>([
    {
      id: 1,
      codigo: "420.005.03.01",
      codPpto: "1",
      entidad: "146",
      da: "1",
      ue: "47",
      prog: "5",
      nroAct: "01",
      descripcionActividad: "Asignación y control de los activos fijos",
      fuente: "20",
      org: "230",
      partida: "2.2.1.10",
      descripcionGasto: "Pasajes al interior del país",
      entidadTransf: "0",
      importe: 5000,
    },
  ]);

  const [formData, setFormData] = useState<Omit<PresupuestoRecord, "id">>({
    codigo: "",
    codPpto: "",
    entidad: "",
    da: "",
    ue: "",
    prog: "",
    nroAct: "",
    descripcionActividad: "",
    fuente: "",
    org: "",
    partida: "",
    descripcionGasto: "",
    entidadTransf: "",
    importe: 0,
    objetoGastoId: undefined,
  });

  // Cargar objetos de gasto al abrir formulario
  useEffect(() => {
    if (showForm) {
      loadObjetosGasto();
    }
  }, [showForm]);

  const loadObjetosGasto = async () => {
    setLoadingObjetos(true);
    try {
      const result = await ObjetoGastoService.listAll(100, 0);
      setObjetosGasto(result.results);
    } catch (error) {
      console.error("Error cargando objetos de gasto:", error);
    } finally {
      setLoadingObjetos(false);
    }
  };

  // Auto-llenar campos cuando se selecciona ObjetoGasto
  const handleObjetoGastoChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const objetoGastoId = e.target.value;

    if (!objetoGastoId) {
      setFormData((prev) => ({
        ...prev,
        objetoGastoId: undefined,
        fuente: "",
        org: "",
        partida: "",
        descripcionGasto: "",
        entidadTransf: "",
      }));
      return;
    }

    try {
      const objetoGasto = await ObjetoGastoService.getById(
        parseInt(objetoGastoId)
      );

      setFormData((prev) => ({
        ...prev,
        objetoGastoId: objetoGasto.id,
        // Auto-llenar campos
        partida: objetoGasto.description || "",
        descripcionGasto: objetoGasto.description || "",
        org: objetoGasto.organismoIdOrg?.codigo || "0",
        fuente: objetoGasto.organismoIdOrg?.fuentes?.[0]?.codigo || "0",
        entidadTransf: objetoGasto.entidadTransferenciaIdEt?.codigo || "0",
      }));
    } catch (error) {
      console.error("Error obteniendo objeto de gasto:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "importe" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      setRecords(
        records.map((r) =>
          r.id === editingId ? { ...formData, id: editingId } : r
        )
      );
      setEditingId(null);
    } else {
      setRecords([...records, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      codigo: "",
      codPpto: "",
      entidad: "",
      da: "",
      ue: "",
      prog: "",
      nroAct: "",
      descripcionActividad: "",
      fuente: "",
      org: "",
      partida: "",
      descripcionGasto: "",
      entidadTransf: "",
      importe: 0,
      objetoGastoId: undefined,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (record: PresupuestoRecord) => {
    setFormData(record);
    setEditingId(record.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de eliminar este registro?")) {
      setRecords(records.filter((r) => r.id !== id));
    }
  };

  const filteredRecords = records.filter((record) =>
    Object.values(record).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPresupuesto = filteredRecords.reduce(
    (sum, record) => sum + record.importe,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestión de Presupuesto
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              UAGRM - Entidad 146 | Gestión 2025
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? "Cancelar" : "Añadir Partida"}
          </button>
        </div>

        {/* Barra de búsqueda y Total */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por código, descripción, partida..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="bg-blue-50 px-6 py-2 rounded border border-blue-200">
            <span className="text-sm text-gray-600 font-medium">
              Total Presupuestario:
            </span>
            <span className="ml-2 text-lg font-bold text-blue-700">
              Bs.{" "}
              {totalPresupuesto.toLocaleString("es-BO", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Formulario Horizontal */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <form onSubmit={handleSubmit}>
            {/* Fila 1: Códigos de Identificación */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleInputChange}
                  required
                  placeholder="420.005.03.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cód. PPTO <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="codPpto"
                  value={formData.codPpto}
                  onChange={handleInputChange}
                  required
                  placeholder="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entidad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="entidad"
                  value={formData.entidad}
                  onChange={handleInputChange}
                  required
                  placeholder="146"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DA <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="da"
                  value={formData.da}
                  onChange={handleInputChange}
                  required
                  placeholder="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Fila 2: Organización y Programa */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ue"
                  value={formData.ue}
                  onChange={handleInputChange}
                  required
                  placeholder="47"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Programa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="prog"
                  value={formData.prog}
                  onChange={handleInputChange}
                  required
                  placeholder="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nro. Act. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nroAct"
                  value={formData.nroAct}
                  onChange={handleInputChange}
                  required
                  placeholder="01"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuente <span className="text-gray-400">(auto)</span>
                </label>
                <input
                  type="text"
                  name="fuente"
                  value={formData.fuente}
                  readOnly
                  placeholder="Se llena automáticamente"
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            {/* Fila 3: Descripción de Actividad */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción de las Actividades{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="descripcionActividad"
                  value={formData.descripcionActividad}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: Asignación y control de los activos fijos..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* NUEVO: Select de Objeto de Gasto */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <label className="block text-sm font-medium text-blue-900 mb-2">
                ⚡ Objeto de Gasto <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.objetoGastoId || ""}
                onChange={handleObjetoGastoChange}
                required
                disabled={loadingObjetos}
                className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100"
              >
                <option value="">
                  {loadingObjetos
                    ? "Cargando..."
                    : "Seleccione un objeto de gasto"}
                </option>
                {objetosGasto.map((obj) => (
                  <option key={obj.id} value={obj.id}>
                    {obj.description} - Bs.{" "}
                    {obj.importeDouble?.toLocaleString("es-BO") || "0"}
                  </option>
                ))}
              </select>
              <p className="text-xs text-blue-700 mt-2">
                💡 Al seleccionar se auto-completarán: Partida, ORG, Fuente y
                Entidad Transferencia
              </p>
            </div>

            {/* Fila 4: Partida y Descripción de Gasto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ORG <span className="text-gray-400">(auto)</span>
                </label>
                <input
                  type="text"
                  name="org"
                  value={formData.org}
                  readOnly
                  placeholder="Se llena automáticamente"
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Partida <span className="text-gray-400">(auto)</span>
                </label>
                <input
                  type="text"
                  name="partida"
                  value={formData.partida}
                  readOnly
                  placeholder="Se llena automáticamente"
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción de Gasto{" "}
                  <span className="text-gray-400">(auto)</span>
                </label>
                <input
                  type="text"
                  name="descripcionGasto"
                  value={formData.descripcionGasto}
                  readOnly
                  placeholder="Se llena automáticamente"
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            {/* Fila 5: Entidad Transferencia e Importe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entidad Transferencia{" "}
                  <span className="text-gray-400">(auto)</span>
                </label>
                <input
                  type="text"
                  name="entidadTransf"
                  value={formData.entidadTransf}
                  readOnly
                  placeholder="Se llena automáticamente"
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Importe (Bs.) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="importe"
                  value={formData.importe}
                  onChange={handleInputChange}
                  required
                  placeholder="5000.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
              >
                <Save size={18} />
                {editingId ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla - IDÉNTICA a tu diseño */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Código
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Cód. PPTO
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Entidad
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  DA
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  UE
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Prog.
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Nro. Act.
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Descripción Actividades
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Fuente
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  ORG
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Partida
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Descripción Gasto
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Entidad Transf.
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
                  Importe
                </th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {record.codigo}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {record.codPpto}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {record.entidad}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {record.da}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {record.ue}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {record.prog}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {record.nroAct}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700 max-w-xs truncate">
                      {record.descripcionActividad}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {record.fuente}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {record.org}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {record.partida}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700 max-w-xs truncate">
                      {record.descripcionGasto}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {record.entidadTransf}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700 text-right font-medium">
                      {record.importe.toLocaleString("es-BO", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(record)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={15}
                    className="px-3 py-12 text-center text-gray-500 italic"
                  >
                    No hay partidas presupuestarias registradas
                  </td>
                </tr>
              )}
            </tbody>
            {/* Total Row */}
            {filteredRecords.length > 0 && (
              <tfoot className="bg-blue-50 border-t-2 border-blue-200">
                <tr>
                  <td
                    colSpan={13}
                    className="px-3 py-3 text-right text-sm font-bold text-gray-900"
                  >
                    TOTAL PRESUPUESTARIO:
                  </td>
                  <td className="px-3 py-3 text-right text-sm font-bold text-blue-700">
                    Bs.{" "}
                    {totalPresupuesto.toLocaleString("es-BO", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default MatrizPresupuesto;
