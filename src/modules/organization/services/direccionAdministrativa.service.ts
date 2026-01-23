// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const DireccionAdministrativaService = {
//   // --- MUTATIONS ---

//   /** Crea una nueva dirección administrativa vinculada a una entidad */
//   create: async (description: string, entidadId: number) => {
//     const mutation = `
//       mutation CreateDireccion($description: String!, $entidadId: Int!) {
//         createDireccionAdministrativa(description: $description, entidadId: $entidadId) {
//           success
//           message
//           data {
//             id
//             description
//             entidad { id sigla codigo }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { description, entidadId });
//   },

//   /** Actualiza la descripción de una dirección administrativa */
//   update: async (id: number, description: string) => {
//     const mutation = `
//       mutation UpdateDireccion($id: ID!, $description: String!) {
//         updateDireccionAdministrativa(id: $id, description: $description) {
//           success
//           message
//           data {
//             id
//             description
//             entidad { id sigla codigo }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, description });
//   },

//   /** Elimina una dirección administrativa por su ID */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteDireccion($id: ID!) {
//         deleteDireccionAdministrativa(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Lista todas las direcciones administrativas */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListDirecciones($limit: Int, $offset: Int) {
//         getDireccionesAdministrativas(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             description
//             entidad { id codigo sigla }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca direcciones por texto (ej: "Recursos") */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchDirecciones($search: String!, $limit: Int) {
//         searchDireccionesAdministrativas(search: $search, limit: $limit) {
//           count
//           results {
//             id
//             description
//             entidad { id sigla }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra direcciones por una entidad específica */
//   filterByEntidad: async (entidadId: number, limit = 100) => {
//     const query = `
//       query FilterByEntidad($entidadId: Int!, $limit: Int) {
//         filterDireccionesAdministrativas(entidadId: $entidadId, limit: $limit) {
//           count
//           results {
//             id
//             description
//             entidad { id codigo sigla }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { entidadId, limit });
//   },

//   /** Obtiene la lista ordenada (ej: "-id") */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetOrdered($orderBy: String, $limit: Int) {
//         getDireccionesAdministrativasOrdenadas(orderBy: $orderBy, limit: $limit) {
//           count
//           results {
//             id
//             description
//             entidad { sigla }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },

//   /** Utilidades de conteo y existencia */
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countDireccionesAdministrativas }`),
//     exists: (id: number) =>
//       fetchGraphQL<any>(
//         `query Exists($id: ID!) { existsDireccionAdministrativa(id: $id) }`,
//         { id }
//       ),
//   },
// };

// src/modules/direccion/services/direccionAdministrativa.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  DireccionAdministrativa,
  CreateDireccionAdministrativaInput,
  UpdateDireccionAdministrativaInput,
} from "@/modules/organization/types/direccionAdministrativa.types";

import {
  LIST_DIRECCIONES_ADMINISTRATIVAS,
  GET_DIRECCION_ADMINISTRATIVA,
  SEARCH_DIRECCIONES_ADMINISTRATIVAS,
  FILTER_DIRECCIONES_ADMINISTRATIVAS,
  GET_DIRECCIONES_ADMINISTRATIVAS_ORDENADAS,
  COUNT_DIRECCIONES_ADMINISTRATIVAS,
  EXISTS_DIRECCION_ADMINISTRATIVA,
} from "@/graphql/organization/queries/direccionAdministrativa.queries";

import {
  CREATE_DIRECCION_ADMINISTRATIVA,
  UPDATE_DIRECCION_ADMINISTRATIVA,
  DELETE_DIRECCION_ADMINISTRATIVA,
} from "@/graphql/organization/mutations/direccionAdministrativa.mutations";

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

const handleError = createServiceErrorHandler("DireccionAdministrativaService");

const normalizarDireccionAdministrativa = (
  direccion: any
): DireccionAdministrativa => ({
  id: direccion.id,
  description: direccion.description,
  entidad: direccion.entidad || null,
});

export const DireccionAdministrativaService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: DireccionAdministrativa[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return DireccionAdministrativaService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }

      const response = await fetchGraphQL<{
        listDireccionesAdministrativas: ListResponse<any>;
      }>(LIST_DIRECCIONES_ADMINISTRATIVAS, { limit, offset });

      const results = response.listDireccionesAdministrativas.results.map(
        normalizarDireccionAdministrativa
      );

      return {
        results,
        count: response.listDireccionesAdministrativas.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: DireccionAdministrativa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchDireccionesAdministrativas: ListResponse<any>;
      }>(SEARCH_DIRECCIONES_ADMINISTRATIVAS, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchDireccionesAdministrativas.results.map(
        normalizarDireccionAdministrativa
      );

      return {
        results,
        count: response.searchDireccionesAdministrativas.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  filterByEntidad: async (
    entidadId: number,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: DireccionAdministrativa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterDireccionesAdministrativas: ListResponse<any>;
      }>(FILTER_DIRECCIONES_ADMINISTRATIVAS, { entidadId, limit, offset });

      const results = response.filterDireccionesAdministrativas.results.map(
        normalizarDireccionAdministrativa
      );

      return {
        results,
        count: response.filterDireccionesAdministrativas.count,
      };
    } catch (error) {
      return handleError("filterByEntidad", error);
    }
  },

  getOrdenadas: async (
    orderBy: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: DireccionAdministrativa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getDireccionesAdministrativasOrdenadas: ListResponse<any>;
      }>(GET_DIRECCIONES_ADMINISTRATIVAS_ORDENADAS, { orderBy, limit, offset });

      const results =
        response.getDireccionesAdministrativasOrdenadas.results.map(
          normalizarDireccionAdministrativa
        );

      return {
        results,
        count: response.getDireccionesAdministrativasOrdenadas.count,
      };
    } catch (error) {
      return handleError("getOrdenadas", error);
    }
  },

  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countDireccionesAdministrativas: number;
      }>(COUNT_DIRECCIONES_ADMINISTRATIVAS, {});

      return response.countDireccionesAdministrativas;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsDireccionAdministrativa: boolean;
      }>(EXISTS_DIRECCION_ADMINISTRATIVA, { id });

      return response.existsDireccionAdministrativa;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getById: async (id: number): Promise<DireccionAdministrativa> => {
    try {
      const response = await fetchGraphQL<{
        getDireccionAdministrativa: MutationResponse<any>;
      }>(GET_DIRECCION_ADMINISTRATIVA, { id });

      if (
        !response.getDireccionAdministrativa.success ||
        !response.getDireccionAdministrativa.data
      ) {
        throw new Error(
          response.getDireccionAdministrativa.message ||
            "No se encontró la Dirección Administrativa"
        );
      }

      return normalizarDireccionAdministrativa(
        response.getDireccionAdministrativa.data
      );
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (
    data: CreateDireccionAdministrativaInput
  ): Promise<DireccionAdministrativa> => {
    try {
      const variables = {
        description: data.description,
        entidadId: data.entidadId,
      };

      const response = await fetchGraphQL<{
        createDireccionAdministrativa: MutationResponse<any>;
      }>(CREATE_DIRECCION_ADMINISTRATIVA, variables);

      if (
        !response.createDireccionAdministrativa.success ||
        !response.createDireccionAdministrativa.data
      ) {
        throw new Error(
          response.createDireccionAdministrativa.message ||
            "No se pudo crear la Dirección Administrativa"
        );
      }

      return normalizarDireccionAdministrativa(
        response.createDireccionAdministrativa.data
      );
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateDireccionAdministrativaInput
  ): Promise<DireccionAdministrativa> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.entidadId !== undefined) variables.entidadId = data.entidadId;

      const response = await fetchGraphQL<{
        updateDireccionAdministrativa: MutationResponse<any>;
      }>(UPDATE_DIRECCION_ADMINISTRATIVA, variables);

      if (
        !response.updateDireccionAdministrativa.success ||
        !response.updateDireccionAdministrativa.data
      ) {
        throw new Error(
          response.updateDireccionAdministrativa.message ||
            "No se pudo actualizar la Dirección Administrativa"
        );
      }

      return normalizarDireccionAdministrativa(
        response.updateDireccionAdministrativa.data
      );
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteDireccionAdministrativa: MutationResponse<boolean>;
      }>(DELETE_DIRECCION_ADMINISTRATIVA, { id });

      if (!response.deleteDireccionAdministrativa.success) {
        throw new Error(
          response.deleteDireccionAdministrativa.message ||
            "No se pudo eliminar la Dirección Administrativa"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};
