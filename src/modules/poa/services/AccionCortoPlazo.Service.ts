// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const AccionCortoPlazoService = {
//   // --- MUTATIONS ---

//   /** Crea una nueva acción a corto plazo asociada a un programa [cite: 11] */
//   create: async (description: string, programaId: number) => {
//     const mutation = `
//       mutation CreateAccion($description: String!, $programaId: Int!) {
//         createAccionCortoPlazo(description: $description, programaId: $programaId) {
//           success
//           message
//           data {
//             id
//             description
//             programa { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { description, programaId });
//   },

//   /** Actualiza la descripción o el programa de una acción existente  */
//   update: async (id: number, description: string, programaId: number) => {
//     const mutation = `
//       mutation UpdateAccion($id: ID!, $description: String!, $programaId: Int!) {
//         updateAccionCortoPlazo(id: $id, description: $description, programaId: $programaId) {
//           success
//           message
//           data {
//             id
//             description
//             programa { description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, description, programaId });
//   },

//   /** Elimina una acción a corto plazo por su ID  */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteAccion($id: ID!) {
//         deleteAccionCortoPlazo(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene una acción específica por su ID [cite: 13] */
//   getById: async (id: number) => {
//     const query = `
//       query GetAccion($id: ID!) {
//         getAccionCortoPlazo(id: $id) {
//           success
//           message
//           data {
//             id
//             description
//             programaId
//             programa { description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista acciones con soporte para paginación [cite: 14] */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListAcciones($limit: Int, $offset: Int) {
//         listAccionesCortoPlazo(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             description
//             programa { description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca acciones por coincidencia de texto en la descripción [cite: 15] */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchAcciones($search: String!, $limit: Int) {
//         searchAccionesCortoPlazo(search: $search, limit: $limit) {
//           count
//           results {
//             id
//             description
//             programa { description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra acciones que pertenecen a un programa específico [cite: 16] */
//   filterByPrograma: async (programaId: number, limit = 100) => {
//     const query = `
//       query FilterByPrograma($programaId: Int!, $limit: Int) {
//         filterAccionesPorPrograma(programaId: $programaId, limit: $limit) {
//           count
//           results {
//             id
//             description
//             programa { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { programaId, limit });
//   },

//   /** Obtiene la lista ordenada (ej: "description" o "-id") [cite: 16, 17] */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetOrdered($orderBy: String, $limit: Int) {
//         getAccionesCortoPlazoOrdenadas(orderBy: $orderBy, limit: $limit) {
//           count
//           results {
//             id
//             description
//             programa { description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },

//   /** Verifica si existe una acción o cuenta el total [cite: 16] */
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countAccionesCortoPlazo }`),
//     exists: (id: number) =>
//       fetchGraphQL<any>(
//         `query Exists($id: ID!) { existsAccionCortoPlazo(id: $id) }`,
//         { id }
//       ),
//   },
// };

// src/modules/poa/services/accionCortoPlazo.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  AccionCortoPlazo,
  CreateAccionCortoPlazoInput,
  UpdateAccionCortoPlazoInput,
} from "@/modules/poa/types/accionCortoPlazo.types";

import {
  LIST_ACCIONES_CORTO_PLAZO,
  GET_ACCION_CORTO_PLAZO,
  SEARCH_ACCIONES_CORTO_PLAZO,
  FILTER_ACCIONES_POR_PROGRAMA,
  GET_ACCIONES_CORTO_PLAZO_ORDENADAS,
  COUNT_ACCIONES_CORTO_PLAZO,
  EXISTS_ACCION_CORTO_PLAZO,
} from "@/graphql/poa/queries/accionCortoPlazo.queries";

import {
  CREATE_ACCION_CORTO_PLAZO,
  UPDATE_ACCION_CORTO_PLAZO,
  DELETE_ACCION_CORTO_PLAZO,
} from "@/graphql/poa/mutations/accionCortoPlazo.mutations";

interface MutationResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

interface ListResponse<T> {
  count: number;
  results: T[];
}

interface PaginationParams {
  limit?: number;
  offset?: number;
}

const handleError = createServiceErrorHandler("AccionCortoPlazoService");

const normalizarAccionCortoPlazo = (accion: any): AccionCortoPlazo => ({
  id: accion.id,
  description: accion.description,
  programa: accion.programa || null,
});

export const AccionCortoPlazoService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string,
  ): Promise<{ results: AccionCortoPlazo[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return AccionCortoPlazoService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }

      const response = await fetchGraphQL<{
        listAccionesCortoPlazo: ListResponse<any>;
      }>(LIST_ACCIONES_CORTO_PLAZO, { limit, offset });

      const results = response.listAccionesCortoPlazo.results.map(
        normalizarAccionCortoPlazo,
      );

      return {
        results,
        count: response.listAccionesCortoPlazo.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: AccionCortoPlazo[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchAccionesCortoPlazo: ListResponse<any>;
      }>(SEARCH_ACCIONES_CORTO_PLAZO, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchAccionesCortoPlazo.results.map(
        normalizarAccionCortoPlazo,
      );

      return {
        results,
        count: response.searchAccionesCortoPlazo.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  filterByPrograma: async (
    programaId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: AccionCortoPlazo[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterAccionesPorPrograma: ListResponse<any>;
      }>(FILTER_ACCIONES_POR_PROGRAMA, { programaId, limit, offset });

      const results = response.filterAccionesPorPrograma.results.map(
        normalizarAccionCortoPlazo,
      );

      return {
        results,
        count: response.filterAccionesPorPrograma.count,
      };
    } catch (error) {
      return handleError("filterByPrograma", error);
    }
  },

  getOrdenadas: async (
    orderBy: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: AccionCortoPlazo[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getAccionesCortoPlazoOrdenadas: ListResponse<any>;
      }>(GET_ACCIONES_CORTO_PLAZO_ORDENADAS, { orderBy, limit, offset });

      const results = response.getAccionesCortoPlazoOrdenadas.results.map(
        normalizarAccionCortoPlazo,
      );

      return {
        results,
        count: response.getAccionesCortoPlazoOrdenadas.count,
      };
    } catch (error) {
      return handleError("getOrdenadas", error);
    }
  },

  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countAccionesCortoPlazo: number;
      }>(COUNT_ACCIONES_CORTO_PLAZO, {});

      return response.countAccionesCortoPlazo;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsAccionCortoPlazo: boolean;
      }>(EXISTS_ACCION_CORTO_PLAZO, { id });

      return response.existsAccionCortoPlazo;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getById: async (id: number): Promise<AccionCortoPlazo> => {
    try {
      const response = await fetchGraphQL<{
        getAccionCortoPlazo: MutationResponse<any>;
      }>(GET_ACCION_CORTO_PLAZO, { id });

      if (
        !response.getAccionCortoPlazo.success ||
        !response.getAccionCortoPlazo.data
      ) {
        throw new Error(
          response.getAccionCortoPlazo.message ||
            "No se encontró la Acción Corto Plazo",
        );
      }

      return normalizarAccionCortoPlazo(response.getAccionCortoPlazo.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (
    data: CreateAccionCortoPlazoInput,
  ): Promise<AccionCortoPlazo> => {
    try {
      const variables = {
        description: data.description,
        programaId: data.programaId,
      };

      const response = await fetchGraphQL<{
        createAccionCortoPlazo: MutationResponse<any>;
      }>(CREATE_ACCION_CORTO_PLAZO, variables);

      if (
        !response.createAccionCortoPlazo.success ||
        !response.createAccionCortoPlazo.data
      ) {
        throw new Error(
          response.createAccionCortoPlazo.message ||
            "No se pudo crear la Acción Corto Plazo",
        );
      }

      return normalizarAccionCortoPlazo(response.createAccionCortoPlazo.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateAccionCortoPlazoInput,
  ): Promise<AccionCortoPlazo> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.programaId !== undefined) variables.programaId = data.programaId;

      const response = await fetchGraphQL<{
        updateAccionCortoPlazo: MutationResponse<any>;
      }>(UPDATE_ACCION_CORTO_PLAZO, variables);

      if (
        !response.updateAccionCortoPlazo.success ||
        !response.updateAccionCortoPlazo.data
      ) {
        throw new Error(
          response.updateAccionCortoPlazo.message ||
            "No se pudo actualizar la Acción Corto Plazo",
        );
      }

      return normalizarAccionCortoPlazo(response.updateAccionCortoPlazo.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteAccionCortoPlazo: MutationResponse<boolean>;
      }>(DELETE_ACCION_CORTO_PLAZO, { id });

      if (!response.deleteAccionCortoPlazo.success) {
        throw new Error(
          response.deleteAccionCortoPlazo.message ||
            "No se pudo eliminar la Acción Corto Plazo",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};
