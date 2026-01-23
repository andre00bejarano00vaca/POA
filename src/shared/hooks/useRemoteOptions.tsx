// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";

// export interface RemoteOption {
//   value: number;
//   label: string;
// }

// type SearchFn = (params: {
//   search: string;
//   limit: number;
//   offset: number;
// }) => Promise<{ results: any[]; count: number }>;

// export function useRemoteOptions({
//   searchFn,
//   mapToOption,
//   limit = 10,
// }: {
//   searchFn: SearchFn;
//   mapToOption: (item: any) => RemoteOption;
//   limit?: number;
// }) {
//   const [query, setQuery] = useState("");
//   const [options, setOptions] = useState<RemoteOption[]>([]);
//   const [loading, setLoading] = useState(false);

//   const lastFetchKey = useRef<string>("");

//   const fetchOptions = useCallback(
//     async (search: string) => {
//       const key = `${search}|${limit}`;
//       if (lastFetchKey.current === key) return; // evita refetch duplicado
//       lastFetchKey.current = key;

//       setLoading(true);
//       try {
//         const res = await searchFn({ search, limit, offset: 0 });
//         const mapped = res.results.map(mapToOption);

//         // opcional: quitar duplicados por value
//         const uniq = Array.from(
//           new Map(mapped.map((o) => [o.value, o])).values()
//         );
//         setOptions(uniq);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [searchFn, mapToOption, limit]
//   );

//   // ✅ Fetch cuando el usuario escribe (debounce simple)
//   useEffect(() => {
//     const t = setTimeout(() => {
//       // si está vacío, no hacemos fetch automático
//       // (la carga inicial la hace loadInitial)
//       if (query.trim()) {
//         fetchOptions(query.trim());
//       }
//     }, 350);

//     return () => clearTimeout(t);
//   }, [query, fetchOptions]);

//   // ✅ NUEVO: carga inicial explícita (query vacío)
//   const loadInitial = useCallback(async () => {
//     // fuerza fetch incluso con search vacío
//     lastFetchKey.current = ""; // resetea para que no se bloquee
//     await fetchOptions("");
//   }, [fetchOptions]);

//   // ✅ útil cuando seleccionas y quieres limpiar el caché
//   const reset = useCallback(() => {
//     setQuery("");
//     setOptions([]);
//     lastFetchKey.current = "";
//   }, []);

//   return {
//     query,
//     setQuery,
//     options,
//     loading,
//     loadInitial,
//     reset,
//   };
// }

// src/shared/hooks/useRemoteOptions.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface RemoteOption {
  value: number;
  label: string;
}

export type SearchParams = {
  search?: string;
  limit?: number;
  offset?: number;
};

export type SearchFn<T = any> = (
  params: SearchParams,
) => Promise<{ results: T[]; count: number }>;

export function useRemoteOptions<T>({
  searchFn,
  mapToOption,
  limit = 10,
}: {
  searchFn: SearchFn<T>;
  mapToOption: (item: T) => RemoteOption;
  limit?: number;
}) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<RemoteOption[]>([]);
  const [loading, setLoading] = useState(false);

  const lastFetchKey = useRef<string>("");

  const fetchOptions = useCallback(
    async (search?: string) => {
      const key = `${search ?? ""}|${limit}`;
      if (lastFetchKey.current === key) return;
      lastFetchKey.current = key;

      setLoading(true);
      try {
        const res = await searchFn({
          search,
          limit,
          offset: 0,
        });

        const mapped = res.results.map(mapToOption);

        // eliminar duplicados por value
        const unique = Array.from(
          new Map(mapped.map((o) => [o.value, o])).values(),
        );

        setOptions(unique);
      } finally {
        setLoading(false);
      }
    },
    [searchFn, mapToOption, limit],
  );

  // 🔎 búsqueda al escribir (con debounce simple)
  useEffect(() => {
    const t = setTimeout(() => {
      if (query.trim()) {
        fetchOptions(query.trim());
      }
    }, 350);

    return () => clearTimeout(t);
  }, [query, fetchOptions]);

  // 🚀 carga inicial (cuando se abre el select)
  const loadInitial = useCallback(async () => {
    lastFetchKey.current = "";
    await fetchOptions(undefined);
  }, [fetchOptions]);

  const reset = useCallback(() => {
    setQuery("");
    setOptions([]);
    lastFetchKey.current = "";
  }, []);

  return {
    query,
    setQuery,
    options,
    loading,
    loadInitial,
    reset,
  };
}
