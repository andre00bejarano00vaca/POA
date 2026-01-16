// src/hooks/useMatrizPresupuesto.ts
"use client";

import { useState, useCallback } from "react";
import { ObjetoGastoService } from "@/modules/presupuesto/services/objetoGasto.service";
import type { MatrizPresupuestoRecord } from "@/modules/presupuesto/types/matrizPresupuesto.types";

export const useMatrizPresupuesto = () => {
  const [records, setRecords] = useState<MatrizPresupuestoRecord[]>([
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
      objetoGastoId: 1,
      fuente: "20",
      org: "230",
      partida: "2.2.1.10",
      descripcionGasto: "Pasajes al interior del país",
      entidadTransf: "0",
      importe: 5000,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-llenar campos desde ObjetoGasto
  const enrichWithObjetoGasto = useCallback(async (data: any) => {
    if (!data.objetoGastoId) return data;

    try {
      const objetoGasto = await ObjetoGastoService.getById(data.objetoGastoId);

      return {
        ...data,
        partida: objetoGasto.description,
        descripcionGasto: objetoGasto.description,
        org: objetoGasto.organismoIdOrg?.codigo || "0",
        fuente: objetoGasto.organismoIdOrg?.fuentes?.[0]?.codigo || "0",
        entidadTransf: objetoGasto.entidadTransferenciaIdEt?.codigo || "0",
      };
    } catch (err) {
      console.error("Error enriching with ObjetoGasto:", err);
      return data;
    }
  }, []);

  const listAll = useCallback(async () => {
    setLoading(true);
    try {
      // Aquí iría la llamada al backend real
      return { results: records, count: records.length };
    } finally {
      setLoading(false);
    }
  }, [records]);

  const getById = useCallback(
    async (id: number) => {
      const record = records.find((r) => r.id === id);
      if (!record) throw new Error("Registro no encontrado");
      return record;
    },
    [records]
  );

  const create = useCallback(
    async (data: any) => {
      setLoading(true);
      try {
        const enrichedData = await enrichWithObjetoGasto(data);
        const newRecord = {
          ...enrichedData,
          id: Date.now(),
        };
        setRecords((prev) => [...prev, newRecord]);
        return newRecord;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al crear");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [enrichWithObjetoGasto]
  );

  const update = useCallback(
    async (id: number, data: any) => {
      setLoading(true);
      try {
        const enrichedData = await enrichWithObjetoGasto(data);
        setRecords((prev) =>
          prev.map((r) => (r.id === id ? { ...enrichedData, id } : r))
        );
        return { ...enrichedData, id };
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al actualizar");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [enrichWithObjetoGasto]
  );

  const deleteRecord = useCallback(async (id: number) => {
    setLoading(true);
    try {
      setRecords((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    listAll,
    getById,
    create,
    update,
    delete: deleteRecord,
    loading,
    error,
  };
};
