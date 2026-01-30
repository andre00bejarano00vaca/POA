// src/modules/poa/hooks/useProgramacionTrimestral.ts
"use client";

import { useState, useCallback } from "react";
import { ProgramacionTrimestralService } from "../services/programacionTrimestralMeta.service";
import type {
  ProgramacionTrimestral,
  UpdateProgramacionTrimestralInput,
} from "../types/programacionTrimestralMeta.types";

export const useProgramacionTrimestral = () => {
  const [data, setData] = useState<ProgramacionTrimestral[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await ProgramacionTrimestralService.listAll();
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
    async (id: number, input: UpdateProgramacionTrimestralInput) => {
      setLoading(true);
      setError(null);
      try {
        const updated = await ProgramacionTrimestralService.update(id, input);
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
      await ProgramacionTrimestralService.delete(id);
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
