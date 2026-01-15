// src/shared/hooks/useDebounce.ts
import { useEffect, useState } from "react";

/**
 * Hook para aplicar debounce a un valor
 * Útil para búsquedas en tiempo real donde no queremos hacer
 * una petición al backend con cada tecla que presiona el usuario
 *
 * @param value - El valor a aplicar debounce
 * @param delay - Tiempo de espera en milisegundos (default: 500ms)
 * @returns El valor con debounce aplicado
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   // Esta búsqueda solo se ejecuta 500ms después de que el usuario deja de escribir
 *   fetchResults(debouncedSearch);
 * }, [debouncedSearch]);
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Establecer un timer que actualiza el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timeout si el valor cambia antes de que termine el delay
    // (esto es lo que hace el "debounce")
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
