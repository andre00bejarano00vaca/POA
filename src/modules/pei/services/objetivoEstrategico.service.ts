// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const ObjetivoEstrategicoService = {
//   // --- MUTATIONS ---

//   /** Crea un nuevo objetivo estratégico AMP vinculado a una política de desarrollo */
//   create: async (
//     idOe: number,
//     description: string,
//     politicaDesarrolloId: number
//   ) => {
//     const mutation = `
//       mutation CreateObjetivo($idOe: Int!, $description: String!, $politicaId: Int!) {
//         createObjetivoEstrategicoAmp(
//           idOe: $idOe
//           description: $description
//           politicaDesarrolloId: $politicaId
//         ) {
//           success
//           message
//           data {
//             id
//             idOe
//             description
//             politicaDesarrolloId
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, {
//       idOe,
//       description,
//       politicaId: politicaDesarrolloId,
//     });
//   },

//   /** Actualiza la descripción de un objetivo estratégico existente */
//   update: async (id: number, description: string) => {
//     const mutation = `
//       mutation UpdateObjetivo($id: ID!, $description: String!) {
//         updateObjetivoEstrategicoAmp(id: $id, description: $description) {
//           success
//           message
//           data {
//             id
//             idOe
//             description
//             politicaDesarrollo { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, description });
//   },

//   /** Elimina un objetivo estratégico por su ID interno */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteObjetivo($id: ID!) {
//         deleteObjetivoEstrategicoAmp(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene un objetivo estratégico por su ID con el detalle de su política */
//   getById: async (id: number) => {
//     const query = `
//       query GetObjetivo($id: ID!) {
//         getObjetivoEstrategicoAmp(id: $id) {
//           success
//           message
//           data {
//             id
//             idOe
//             description
//             politicaDesarrollo { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista objetivos estratégicos con soporte para paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListObjetivos($limit: Int, $offset: Int) {
//         listObjetivosEstrategicosAmp(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             idOe
//             description
//             politicaDesarrollo { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca objetivos por coincidencia de texto en la descripción */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchObjetivos($search: String!, $limit: Int) {
//         searchObjetivosEstrategicosAmp(search: $search, limit: $limit) {
//           count
//           results {
//             id
//             idOe
//             description
//             politicaDesarrollo { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra objetivos por una política de desarrollo específica */
//   filterByPolitica: async (politicaDesarrolloId: number, limit = 100) => {
//     const query = `
//       query FilterByPolitica($politicaId: Int!, $limit: Int) {
//         filterObjetivosPorPolitica(politicaDesarrolloId: $politicaId, limit: $limit) {
//           count
//           results {
//             id
//             idOe
//             description
//             politicaDesarrollo { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, {
//       politicaId: politicaDesarrolloId,
//       limit,
//     });
//   },

//   /** Busca un objetivo por su código id_oe único */
//   filterByIdOe: async (idOe: number) => {
//     const query = `
//       query FilterByIdOe($idOe: Int!) {
//         filterObjetivoPorIdOe(idOe: $idOe) {
//           success
//           message
//           data {
//             id
//             idOe
//             description
//             politicaDesarrollo { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { idOe });
//   },

//   /** Obtiene la lista ordenada (ej: "-id", "id_oe", "description") */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetOrdered($orderBy: String, $limit: Int) {
//         getObjetivosEstrategicosAmpOrdenados(orderBy: $orderBy, limit: $limit) {
//           count
//           results {
//             id
//             idOe
//             description
//             politicaDesarrollo { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },

//   /** Utilidades para conteo y validación */
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countObjetivosEstrategicosAmp }`),
//     exists: (id: number) =>
//       fetchGraphQL<any>(
//         `query Exists($id: ID!) { existsObjetivoEstrategicoAmp(id: $id) }`,
//         { id }
//       ),
//   },
// };

// src/modules/pei/services/objetivoEstrategico.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  ObjetivoEstrategico,
  CreateObjetivoEstrategicoInput,
  UpdateObjetivoEstrategicoInput,
} from "../types/objetivoEstrategico.types";

import {
  LIST_OBJETIVOS_ESTRATEGICOS,
  SEARCH_OBJETIVOS_ESTRATEGICOS,
  GET_OBJETIVO_ESTRATEGICO,
  FILTER_OBJETIVOS_POR_POLITICA,
} from "@/graphql/pei/queries/objetivoEstrategico.queries";

import {
  CREATE_OBJETIVO_ESTRATEGICO,
  UPDATE_OBJETIVO_ESTRATEGICO,
  DELETE_OBJETIVO_ESTRATEGICO,
} from "@/graphql/pei/mutations/objetivoEstrategico.mutations";

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

const handleError = createServiceErrorHandler("ObjetivoEstrategicoService");

// ✅ Normalizer simple sin helpers
const normalizarObjetivoEstrategico = (obj: any): ObjetivoEstrategico => ({
  id: obj.id,
  idOe: obj.idOe,
  description: obj.description,
  politicaDesarrollo: obj.politicaDesarrollo ?? null,
});

export const ObjetivoEstrategicoService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: ObjetivoEstrategico[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return ObjetivoEstrategicoService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }

      const response = await fetchGraphQL<{
        listObjetivosEstrategicosAmp: ListResponse<any>;
      }>(LIST_OBJETIVOS_ESTRATEGICOS, { limit, offset });

      const results = response.listObjetivosEstrategicosAmp.results.map(
        normalizarObjetivoEstrategico
      );

      return {
        results,
        count: response.listObjetivosEstrategicosAmp.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: ObjetivoEstrategico[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchObjetivosEstrategicosAmp: ListResponse<any>;
      }>(SEARCH_OBJETIVOS_ESTRATEGICOS, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchObjetivosEstrategicosAmp.results.map(
        normalizarObjetivoEstrategico
      );

      return {
        results,
        count: response.searchObjetivosEstrategicosAmp.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  filterByPolitica: async (
    politicaDesarrolloId: number,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: ObjetivoEstrategico[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterObjetivosPorPolitica: ListResponse<any>;
      }>(FILTER_OBJETIVOS_POR_POLITICA, {
        politicaDesarrolloId,
        limit,
        offset,
      });

      const results = response.filterObjetivosPorPolitica.results.map(
        normalizarObjetivoEstrategico
      );

      return {
        results,
        count: response.filterObjetivosPorPolitica.count,
      };
    } catch (error) {
      return handleError("filterByPolitica", error);
    }
  },

  getById: async (id: number): Promise<ObjetivoEstrategico> => {
    try {
      const response = await fetchGraphQL<{
        getObjetivoEstrategicoAmp: MutationResponse<any>;
      }>(GET_OBJETIVO_ESTRATEGICO, { id });

      if (
        !response.getObjetivoEstrategicoAmp.success ||
        !response.getObjetivoEstrategicoAmp.data
      ) {
        throw new Error(
          response.getObjetivoEstrategicoAmp.message ||
            "No se encontró el Objetivo Estratégico"
        );
      }

      return normalizarObjetivoEstrategico(
        response.getObjetivoEstrategicoAmp.data
      );
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (
    data: CreateObjetivoEstrategicoInput
  ): Promise<ObjetivoEstrategico> => {
    try {
      const variables = {
        idOe: data.idOe,
        description: data.description,
        politicaDesarrolloId: data.politicaDesarrolloId,
      };

      const response = await fetchGraphQL<{
        createObjetivoEstrategicoAmp: MutationResponse<any>;
      }>(CREATE_OBJETIVO_ESTRATEGICO, variables);

      if (
        !response.createObjetivoEstrategicoAmp.success ||
        !response.createObjetivoEstrategicoAmp.data
      ) {
        throw new Error(
          response.createObjetivoEstrategicoAmp.message ||
            "No se pudo crear el Objetivo Estratégico"
        );
      }

      return normalizarObjetivoEstrategico(
        response.createObjetivoEstrategicoAmp.data
      );
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateObjetivoEstrategicoInput
  ): Promise<ObjetivoEstrategico> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.idOe !== undefined) variables.idOe = data.idOe;
      if (data.description !== undefined)
        variables.description = data.description;
      if (data.politicaDesarrolloId !== undefined)
        variables.politicaDesarrolloId = data.politicaDesarrolloId;

      const response = await fetchGraphQL<{
        updateObjetivoEstrategicoAmp: MutationResponse<any>;
      }>(UPDATE_OBJETIVO_ESTRATEGICO, variables);

      if (
        !response.updateObjetivoEstrategicoAmp.success ||
        !response.updateObjetivoEstrategicoAmp.data
      ) {
        throw new Error(
          response.updateObjetivoEstrategicoAmp.message ||
            "No se pudo actualizar el Objetivo Estratégico"
        );
      }

      return normalizarObjetivoEstrategico(
        response.updateObjetivoEstrategicoAmp.data
      );
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteObjetivoEstrategicoAmp: MutationResponse<boolean>;
      }>(DELETE_OBJETIVO_ESTRATEGICO, { id });

      if (!response.deleteObjetivoEstrategicoAmp.success) {
        throw new Error(
          response.deleteObjetivoEstrategicoAmp.message ||
            "No se pudo eliminar el Objetivo Estratégico"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};
