// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const UnidadEjecutoraService = {
//   // --- MUTATIONS ---

//   /** Crea una nueva unidad ejecutora con un techo presupuestario inicial */
//   create: async (
//     description: string,
//     direccionAdministrativaId: number,
//     techoPres: number
//   ) => {
//     const mutation = `
//       mutation CreateUE($desc: String!, $daId: Int!, $techo: Float!) {
//         createUnidadEjecutora(
//           description: $desc
//           direccionAdministrativaId: $daId
//           techoPres: $techo
//         ) {
//           success
//           message
//           data {
//             id
//             description
//             techoPres
//             direccionAdministrativa { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, {
//       desc: description,
//       daId: direccionAdministrativaId,
//       techo: techoPres,
//     });
//   },

//   /** Actualiza la descripción o el presupuesto asignado a la unidad */
//   update: async (id: number, description: string, techoPres: number) => {
//     const mutation = `
//       mutation UpdateUE($id: ID!, $desc: String!, $techo: Float!) {
//         updateUnidadEjecutora(id: $id, description: $desc, techoPres: $techo) {
//           success
//           message
//           data {
//             id
//             description
//             techoPres
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, {
//       id,
//       desc: description,
//       techo: techoPres,
//     });
//   },

//   /** Elimina una unidad ejecutora */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteUE($id: ID!) {
//         deleteUnidadEjecutora(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene una unidad por ID con su dependencia administrativa */
//   getById: async (id: number) => {
//     const query = `
//       query GetUE($id: ID!) {
//         getUnidadEjecutora(id: $id) {
//           success
//           message
//           data {
//             id
//             description
//             techoPres
//             direccionAdministrativa {
//               id
//               description
//               entidad { sigla }
//             }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista todas las unidades ejecutoras */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListUEs($limit: Int, $offset: Int) {
//         listUnidadesEjecutoras(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             description
//             techoPres
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Filtra unidades que pertenecen a una Dirección Administrativa específica */
//   filterByDireccion: async (daId: number, limit = 100) => {
//     const query = `
//       query FilterUEByDA($daId: Int!, $limit: Int) {
//         filterUnidadesEjecutoras(direccionAdministrativaId: $daId, limit: $limit) {
//           count
//           results {
//             id
//             description
//             techoPres
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { daId, limit });
//   },

//   /** Obtiene unidades ordenadas (ej: por techo presupuestario o descripción) */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetUEOrdered($orderBy: String, $limit: Int) {
//         getUnidadesEjecutorasOrdenadas(orderBy: $orderBy, limit: $limit) {
//           count
//           results {
//             id
//             description
//             techoPres
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },
// };

// src/modules/unidad/services/unidadEjecutora.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  UnidadEjecutora,
  CreateUnidadEjecutoraInput,
  UpdateUnidadEjecutoraInput,
} from "@/modules/organization/types/unidadEjecutora.types";

import {
  LIST_UNIDADES_EJECUTORAS,
  GET_UNIDAD_EJECUTORA,
  SEARCH_UNIDADES_EJECUTORAS,
  FILTER_UNIDADES_EJECUTORAS,
  GET_UNIDADES_EJECUTORAS_ORDENADAS,
  COUNT_UNIDADES_EJECUTORAS,
  EXISTS_UNIDAD_EJECUTORA,
} from "@/graphql/organization/queries/unidadEjecutora.queries";

import {
  CREATE_UNIDAD_EJECUTORA,
  UPDATE_UNIDAD_EJECUTORA,
  DELETE_UNIDAD_EJECUTORA,
} from "@/graphql/organization/mutations/unidadEjecutora.mutations";

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

const handleError = createServiceErrorHandler("UnidadEjecutoraService");

const normalizarUnidadEjecutora = (unidad: any): UnidadEjecutora => ({
  id: unidad.id,
  description: unidad.description,
  techoPres: unidad.techoPres,
  direccionAdministrativa: unidad.direccionAdministrativa || null,
});

export const UnidadEjecutoraService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: UnidadEjecutora[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return UnidadEjecutoraService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }

      const response = await fetchGraphQL<{
        listUnidadesEjecutoras: ListResponse<any>;
      }>(LIST_UNIDADES_EJECUTORAS, { limit, offset });

      const results = response.listUnidadesEjecutoras.results.map(
        normalizarUnidadEjecutora
      );

      return {
        results,
        count: response.listUnidadesEjecutoras.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: UnidadEjecutora[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchUnidadesEjecutoras: ListResponse<any>;
      }>(SEARCH_UNIDADES_EJECUTORAS, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchUnidadesEjecutoras.results.map(
        normalizarUnidadEjecutora
      );

      return {
        results,
        count: response.searchUnidadesEjecutoras.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  filterByDireccion: async (
    direccionAdministrativaId: number,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: UnidadEjecutora[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterUnidadesEjecutoras: ListResponse<any>;
      }>(FILTER_UNIDADES_EJECUTORAS, {
        direccionAdministrativaId,
        limit,
        offset,
      });

      const results = response.filterUnidadesEjecutoras.results.map(
        normalizarUnidadEjecutora
      );

      return {
        results,
        count: response.filterUnidadesEjecutoras.count,
      };
    } catch (error) {
      return handleError("filterByDireccion", error);
    }
  },

  getOrdenadas: async ({
    limit = 10,
    offset = 0,
  }: PaginationParams = {}): Promise<{
    results: UnidadEjecutora[];
    count: number;
  }> => {
    try {
      const response = await fetchGraphQL<{
        getUnidadesEjecutorasOrdenadas: ListResponse<any>;
      }>(GET_UNIDADES_EJECUTORAS_ORDENADAS, { limit, offset });

      const results = response.getUnidadesEjecutorasOrdenadas.results.map(
        normalizarUnidadEjecutora
      );

      return {
        results,
        count: response.getUnidadesEjecutorasOrdenadas.count,
      };
    } catch (error) {
      return handleError("getOrdenadas", error);
    }
  },

  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countUnidadesEjecutoras: number;
      }>(COUNT_UNIDADES_EJECUTORAS, {});

      return response.countUnidadesEjecutoras;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsUnidadEjecutora: boolean;
      }>(EXISTS_UNIDAD_EJECUTORA, { id });

      return response.existsUnidadEjecutora;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getById: async (id: number): Promise<UnidadEjecutora> => {
    try {
      const response = await fetchGraphQL<{
        getUnidadEjecutora: MutationResponse<any>;
      }>(GET_UNIDAD_EJECUTORA, { id });

      if (
        !response.getUnidadEjecutora.success ||
        !response.getUnidadEjecutora.data
      ) {
        throw new Error(
          response.getUnidadEjecutora.message ||
            "No se encontró la Unidad Ejecutora"
        );
      }

      return normalizarUnidadEjecutora(response.getUnidadEjecutora.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (
    data: CreateUnidadEjecutoraInput
  ): Promise<UnidadEjecutora> => {
    try {
      const variables = {
        description: data.description,
        direccionAdministrativaId: data.direccionAdministrativaId,
        techoPres: data.techoPres,
      };

      const response = await fetchGraphQL<{
        createUnidadEjecutora: MutationResponse<any>;
      }>(CREATE_UNIDAD_EJECUTORA, variables);

      if (
        !response.createUnidadEjecutora.success ||
        !response.createUnidadEjecutora.data
      ) {
        throw new Error(
          response.createUnidadEjecutora.message ||
            "No se pudo crear la Unidad Ejecutora"
        );
      }

      return normalizarUnidadEjecutora(response.createUnidadEjecutora.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateUnidadEjecutoraInput
  ): Promise<UnidadEjecutora> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.techoPres !== undefined) variables.techoPres = data.techoPres;

      const response = await fetchGraphQL<{
        updateUnidadEjecutora: MutationResponse<any>;
      }>(UPDATE_UNIDAD_EJECUTORA, variables);

      if (
        !response.updateUnidadEjecutora.success ||
        !response.updateUnidadEjecutora.data
      ) {
        throw new Error(
          response.updateUnidadEjecutora.message ||
            "No se pudo actualizar la Unidad Ejecutora"
        );
      }

      return normalizarUnidadEjecutora(response.updateUnidadEjecutora.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteUnidadEjecutora: MutationResponse<boolean>;
      }>(DELETE_UNIDAD_EJECUTORA, { id });

      if (!response.deleteUnidadEjecutora.success) {
        throw new Error(
          response.deleteUnidadEjecutora.message ||
            "No se pudo eliminar la Unidad Ejecutora"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};
