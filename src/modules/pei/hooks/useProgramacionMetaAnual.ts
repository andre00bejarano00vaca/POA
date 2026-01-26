// src/modules/pei/hooks/useProgramacionMetaAnual.ts
"use client";

import { useState, useCallback } from "react";
import { ProgramacionMetaAnualService } from "../services/programacionMetaAnual.service";
import type {
  ProgramacionMetaAnual,
  UpdateProgramacionMetaAnualInput,
} from "../types/programacionMetaAnual.types";

export const useProgramacionMetaAnual = () => {
  const [data, setData] = useState<ProgramacionMetaAnual[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await ProgramacionMetaAnualService.listAll();
      setData(result.results);
      return result;
    } catch (err: any) {
      setError(err.message || "Error al cargar programaciones");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProgramacion = useCallback(
    async (id: number, input: UpdateProgramacionMetaAnualInput) => {
      setLoading(true);
      setError(null);
      try {
        const updated = await ProgramacionMetaAnualService.update(id, input);
        setData((prev) =>
          prev.map((item) => (item.id === id ? updated : item)),
        );
        return updated;
      } catch (err: any) {
        setError(err.message || "Error al actualizar programación");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteProgramacion = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await ProgramacionMetaAnualService.delete(id);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message || "Error al eliminar programación");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    loadAll,
    update: updateProgramacion,
    delete: deleteProgramacion,
  };
};
