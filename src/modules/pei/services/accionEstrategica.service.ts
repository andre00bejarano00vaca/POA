// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const AccionEstrategicaService = {
//   // --- MUTATIONS ---

//   /** Crea una nueva acción estratégica vinculada a un objetivo estratégico */
//   create: async (description: string, objetivoEstrategicoId: number) => {
//     const mutation = `
//       mutation CreateAccionEstrat($description: String!, $objId: Int!) {
//         createAccionEstrategica(description: $description, objetivoEstrategicoId: $objId) {
//           success
//           message
//           data {
//             id
//             description
//             objetivoEstrategico { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, {
//       description,
//       objId: objetivoEstrategicoId,
//     });
//   },

//   /** Actualiza la descripción de una acción estratégica */
//   update: async (id: number, description: string) => {
//     const mutation = `
//       mutation UpdateAccionEstrat($id: ID!, $description: String!) {
//         updateAccionEstrategica(id: $id, description: $description) {
//           success
//           message
//           data {
//             id
//             description
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, description });
//   },

//   /** Elimina una acción estratégica por su ID */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteAccionEstrat($id: ID!) {
//         deleteAccionEstrategica(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Lista todas las acciones estratégicas con paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListAccionesEstrat($limit: Int, $offset: Int) {
//         listAccionesEstrategicas(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             description
//             objetivoEstrategico { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Obtiene acciones estratégicas ordenadas (ej: "description" o "-id") */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetAccionesOrdered($orderBy: String, $limit: Int) {
//         getAccionesEstrategicasOrdenadas(orderBy: $orderBy, limit: $limit) {
//           count
//           results {
//             id
//             description
//             objetivoEstrategico {
//               id
//               description
//             }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },

//   /** Busca acciones estratégicas por texto */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchAccionesEstrat($search: String!, $limit: Int) {
//         searchAccionesEstrategicas(search: $search, limit: $limit) {
//           count
//           results {
//             id
//             description
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },
// };

// src/modules/pei/services/accionEstrategica.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import {
  normalizeEntity,
  normalizeRelation,
  passthrough,
} from "@/shared/lib/normalizers";
import type {
  AccionEstrategica,
  CreateAccionEstrategicaInput,
  UpdateAccionEstrategicaInput,
} from "../types/accionEstrategica.types";

import {
  LIST_ACCIONES_ESTRATEGICAS,
  SEARCH_ACCIONES_ESTRATEGICAS,
  GET_ACCION_ESTRATEGICA,
  FILTER_ACCIONES_POR_OBJETIVO,
} from "@/graphql/pei/queries/accionEstrategica.queries";

import {
  CREATE_ACCION_ESTRATEGICA,
  UPDATE_ACCION_ESTRATEGICA,
  DELETE_ACCION_ESTRATEGICA,
} from "@/graphql/pei/mutations/accionEstrategica.mutations";

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

const handleError = createServiceErrorHandler("AccionEstrategicaService");

const normalizarAccionEstrategica = (accion: any): AccionEstrategica =>
  normalizeEntity<any, AccionEstrategica>(accion, {
    id: passthrough,
    description: passthrough,
    objetivoEstrategico: normalizeRelation,
  });

export const AccionEstrategicaService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: AccionEstrategica[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return AccionEstrategicaService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }

      const response = await fetchGraphQL<{
        listAccionesEstrategicasInstitucionales: ListResponse<any>;
      }>(LIST_ACCIONES_ESTRATEGICAS, { limit, offset });

      const results =
        response.listAccionesEstrategicasInstitucionales.results.map(
          normalizarAccionEstrategica
        );

      return {
        results,
        count: response.listAccionesEstrategicasInstitucionales.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: AccionEstrategica[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchAccionesEstrategicasInstitucionales: ListResponse<any>;
      }>(SEARCH_ACCIONES_ESTRATEGICAS, {
        search: searchTerm,
        limit,
        offset,
      });

      const results =
        response.searchAccionesEstrategicasInstitucionales.results.map(
          normalizarAccionEstrategica
        );

      return {
        results,
        count: response.searchAccionesEstrategicasInstitucionales.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  filterByObjetivo: async (
    objetivoEstrategicoId: number,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: AccionEstrategica[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterAccionesPorObjetivo: ListResponse<any>;
      }>(FILTER_ACCIONES_POR_OBJETIVO, {
        objetivoEstrategicoId,
        limit,
        offset,
      });

      const results = response.filterAccionesPorObjetivo.results.map(
        normalizarAccionEstrategica
      );

      return {
        results,
        count: response.filterAccionesPorObjetivo.count,
      };
    } catch (error) {
      return handleError("filterByObjetivo", error);
    }
  },

  getById: async (id: number): Promise<AccionEstrategica> => {
    try {
      const response = await fetchGraphQL<{
        getAccionEstrategicaInstitucional: MutationResponse<any>;
      }>(GET_ACCION_ESTRATEGICA, { id });

      if (
        !response.getAccionEstrategicaInstitucional.success ||
        !response.getAccionEstrategicaInstitucional.data
      ) {
        throw new Error(
          response.getAccionEstrategicaInstitucional.message ||
            "No se encontró la Acción Estratégica"
        );
      }

      return normalizarAccionEstrategica(
        response.getAccionEstrategicaInstitucional.data
      );
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (
    data: CreateAccionEstrategicaInput
  ): Promise<AccionEstrategica> => {
    try {
      const variables = {
        description: data.description,
        objetivoEstrategicoId: data.objetivoEstrategicoId,
      };

      const response = await fetchGraphQL<{
        createAccionEstrategicaInstitucional: MutationResponse<any>;
      }>(CREATE_ACCION_ESTRATEGICA, variables);

      if (
        !response.createAccionEstrategicaInstitucional.success ||
        !response.createAccionEstrategicaInstitucional.data
      ) {
        throw new Error(
          response.createAccionEstrategicaInstitucional.message ||
            "No se pudo crear la Acción Estratégica"
        );
      }

      return normalizarAccionEstrategica(
        response.createAccionEstrategicaInstitucional.data
      );
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateAccionEstrategicaInput
  ): Promise<AccionEstrategica> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.objetivoEstrategicoId !== undefined)
        variables.objetivoEstrategicoId = data.objetivoEstrategicoId;

      const response = await fetchGraphQL<{
        updateAccionEstrategicaInstitucional: MutationResponse<any>;
      }>(UPDATE_ACCION_ESTRATEGICA, variables);

      if (
        !response.updateAccionEstrategicaInstitucional.success ||
        !response.updateAccionEstrategicaInstitucional.data
      ) {
        throw new Error(
          response.updateAccionEstrategicaInstitucional.message ||
            "No se pudo actualizar la Acción Estratégica"
        );
      }

      return normalizarAccionEstrategica(
        response.updateAccionEstrategicaInstitucional.data
      );
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteAccionEstrategicaInstitucional: MutationResponse<boolean>;
      }>(DELETE_ACCION_ESTRATEGICA, { id });

      if (!response.deleteAccionEstrategicaInstitucional.success) {
        throw new Error(
          response.deleteAccionEstrategicaInstitucional.message ||
            "No se pudo eliminar la Acción Estratégica"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};
