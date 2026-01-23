// src/shared/hooks/useCrud.ts
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useDebounce } from "./useDebounce";

interface CrudOperations<T, CreateInput, UpdateInput> {
  listAll: (
    limit: number,
    offset: number,
    search?: string,
  ) => Promise<{
    results: T[];
    count: number;
  }>;
  getById?: (id: number) => Promise<T | undefined>;
  create: (data: CreateInput) => Promise<T>;
  update?: (id: number, data: UpdateInput) => Promise<T>;
  delete?: (id: number) => Promise<void>;
}

export function useCrud<T, CreateInput, UpdateInput>({
  listAll,
  getById,
  create,
  update,
  delete: deleteOp,
}: CrudOperations<T, CreateInput, UpdateInput>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ✅ CRÍTICO: Aplicar debounce para evitar múltiples llamadas API
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / itemsPerPage)),
    [totalItems, itemsPerPage],
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const data = await listAll(
        itemsPerPage,
        offset,
        debouncedSearchTerm || undefined, // ✅ Usar debouncedSearchTerm
      );

      setItems(data.results);
      setTotalItems(data.count);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "Error al cargar los datos");
      setItems([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearchTerm, listAll]); // ✅ Dependencia: debouncedSearchTerm

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const createItem = async (data: CreateInput): Promise<T> => {
    const newItem = await create(data);
    await fetchData();
    return newItem;
  };

  const updateItem = update
    ? async (id: number, data: UpdateInput): Promise<T> => {
        const updatedItem = await update(id, data);
        await fetchData();
        return updatedItem;
      }
    : undefined;

  const deleteItem = deleteOp
    ? async (id: number): Promise<void> => {
        await deleteOp(id);
        await fetchData();
      }
    : undefined;

  const getItemById = getById;

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    getItemById,

    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    setCurrentPage,
    setItemsPerPage,
    searchTerm, // ✅ Usuario ve cambio inmediato en input
    setSearchTerm, // ✅ Input responde inmediatamente

    refetch,
  };
}

// src/shared/hooks/useCrud.ts
// "use client";

// import { useState, useEffect, useMemo, useCallback } from "react";
// import { useDebounce } from "./useDebounce";

// export type PaginationParams = {
//   limit?: number;
//   offset?: number;
//   search?: string;
// };

// type ListResponse<T> = Promise<{
//   results: T[];
//   count: number;
// }>;

// interface CrudOperations<T, CreateInput, UpdateInput> {
//   // ✅ estándar único: SIEMPRE objeto
//   listAll: (params?: PaginationParams) => ListResponse<T>;
//   getById?: (id: number) => Promise<T | undefined>;
//   create: (data: CreateInput) => Promise<T>;
//   update?: (id: number, data: UpdateInput) => Promise<T>;
//   delete?: (id: number) => Promise<void>;
// }

// export function useCrud<T, CreateInput, UpdateInput>({
//   listAll,
//   getById,
//   create,
//   update,
//   delete: deleteOp,
// }: CrudOperations<T, CreateInput, UpdateInput>) {
//   const [items, setItems] = useState<T[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [itemsPerPage, setItemsPerPage] = useState<number>(10);
//   const [totalItems, setTotalItems] = useState<number>(0);
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   const debouncedSearchTerm = useDebounce(searchTerm, 500);

//   const totalPages = useMemo(
//     () => Math.max(1, Math.ceil(totalItems / itemsPerPage)),
//     [totalItems, itemsPerPage],
//   );

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const offset = (currentPage - 1) * itemsPerPage;

//       const data = await listAll({
//         limit: itemsPerPage,
//         offset,
//         search: debouncedSearchTerm || undefined,
//       });

//       setItems(data.results);
//       setTotalItems(data.count);
//     } catch (err: any) {
//       console.error("Error fetching data:", err);
//       setError(err?.message || "Error al cargar los datos");
//       setItems([]);
//       setTotalItems(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, debouncedSearchTerm, listAll]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const createItem = async (data: CreateInput): Promise<T> => {
//     const newItem = await create(data);
//     await fetchData();
//     return newItem;
//   };

//   const updateItem = update
//     ? async (id: number, data: UpdateInput): Promise<T> => {
//         const updatedItem = await update(id, data);
//         await fetchData();
//         return updatedItem;
//       }
//     : undefined;

//   const deleteItem = deleteOp
//     ? async (id: number): Promise<void> => {
//         await deleteOp(id);
//         await fetchData();
//       }
//     : undefined;

//   const refetch = useCallback(() => {
//     fetchData();
//   }, [fetchData]);

//   return {
//     items,
//     loading,
//     error,
//     createItem,
//     updateItem,
//     deleteItem,
//     getItemById: getById,

//     currentPage,
//     itemsPerPage,
//     totalItems,
//     totalPages,
//     setCurrentPage,
//     setItemsPerPage,
//     searchTerm,
//     setSearchTerm,

//     refetch,
//   };
// }
