// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const PoliticaDesarrolloService = {
//   // --- MUTATIONS ---

//   /** Crea una nueva política de desarrollo vinculada a un área estratégica */
//   create: async (
//     idPd: number,
//     description: string,
//     areaEstrategicaId: number
//   ) => {
//     const mutation = `
//       mutation CreatePolitica($idPd: Int!, $description: String!, $areaId: Int!) {
//         createPoliticaDesarrollo(
//           idPd: $idPd
//           description: $description
//           areaEstrategicaId: $areaId
//         ) {
//           success
//           message
//           data {
//             id
//             idPd
//             description
//             areaEstrategica { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, {
//       idPd,
//       description,
//       areaId: areaEstrategicaId,
//     });
//   },

//   /** Actualiza la descripción de una política de desarrollo existente */
//   update: async (id: number, description: string) => {
//     const mutation = `
//       mutation UpdatePolitica($id: ID!, $description: String!) {
//         updatePoliticaDesarrollo(id: $id, description: $description) {
//           success
//           message
//           data {
//             id
//             idPd
//             description
//             areaEstrategica { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, description });
//   },

//   /** Elimina una política de desarrollo por su ID */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeletePolitica($id: ID!) {
//         deletePoliticaDesarrollo(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene una política de desarrollo por su ID */
//   getById: async (id: number) => {
//     const query = `
//       query GetPolitica($id: ID!) {
//         getPoliticaDesarrollo(id: $id) {
//           success
//           message
//           data {
//             id
//             idPd
//             description
//             areaEstrategica { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista todas las políticas de desarrollo con paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListPoliticas($limit: Int, $offset: Int) {
//         listPoliticasDesarrollo(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             idPd
//             description
//             areaEstrategica { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca políticas de desarrollo por descripción */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchPoliticas($search: String!, $limit: Int) {
//         searchPoliticasDesarrollo(search: $search, limit: $limit) {
//           count
//           results {
//             id
//             idPd
//             description
//             areaEstrategica { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra políticas por un área estratégica específica */
//   filterByArea: async (areaEstrategicaId: number, limit = 100) => {
//     const query = `
//       query FilterByArea($areaId: Int!, $limit: Int) {
//         filterPoliticasPorArea(areaEstrategicaId: $areaId, limit: $limit) {
//           count
//           results {
//             id
//             idPd
//             description
//             areaEstrategica { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { areaId: areaEstrategicaId, limit });
//   },

//   /** Obtiene una política filtrando por su código idPd único */
//   filterByIdPd: async (idPd: number) => {
//     const query = `
//       query FilterByIdPd($idPd: Int!) {
//         filterPoliticasPorIdPd(idPd: $idPd) {
//           success
//           message
//           data {
//             id
//             idPd
//             description
//             areaEstrategica { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { idPd });
//   },

//   /** Obtiene la lista ordenada (ej: "-id", "id_pd", "description") */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetOrdered($orderBy: String, $limit: Int) {
//         getPoliticasDesarrolloOrdenadas(orderBy: $orderBy, limit: $limit) {
//           count
//           results {
//             id
//             idPd
//             description
//             areaEstrategica { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },

//   /** Utilidades para conteo y verificación de existencia */
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countPoliticasDesarrollo }`),
//     exists: (id: number) =>
//       fetchGraphQL<any>(
//         `query Exists($id: ID!) { existsPoliticaDesarrollo(id: $id) }`,
//         { id }
//       ),
//   },
// };

// src/modules/pei/services/politicaDesarrollo.service.ts

// import { fetchGraphQL } from "@/shared/lib/graphql-client";
// import { createServiceErrorHandler } from "@/shared/lib/service-errors";
// import {
//   normalizeEntity,
//   normalizeRelation,
//   passthrough,
// } from "@/shared/lib/normalizers";
// import type {
//   PoliticaDesarrollo,
//   CreatePoliticaDesarrolloInput,
//   UpdatePoliticaDesarrolloInput,
// } from "@/modules/pei/types/politicaDesarrollo.types";

// import {
//   LIST_POLITICAS_DESARROLLO,
//   SEARCH_POLITICAS_DESARROLLO,
//   GET_POLITICA_DESARROLLO,
//   FILTER_POLITICAS_POR_AREA,
// } from "@/graphql/pei/queries/politicaDesarrollo.queries";

// import {
//   CREATE_POLITICA_DESARROLLO,
//   UPDATE_POLITICA_DESARROLLO,
//   DELETE_POLITICA_DESARROLLO,
// } from "@/graphql/pei/mutations/politicaDesarrollo.mutations";

// // TYPES
// interface MutationResponse<T> {
//   success: boolean;
//   message: string;
//   data: T | null;
// }

// interface ListResponse<T> {
//   count: number;
//   results: T[];
// }

// interface PaginationParams {
//   limit?: number;
//   offset?: number;
// }
// // ERROR HANDLER
// const handleError = createServiceErrorHandler("PoliticaDesarrolloService");

// // NORMALIZER (usando helper reutilizable)
// const normalizarPoliticaDesarrollo = (politica: any): PoliticaDesarrollo =>
//   normalizeEntity<any, PoliticaDesarrollo>(politica, {
//     id: passthrough,
//     idPd: passthrough,
//     description: passthrough,
//     areaEstrategica: normalizeRelation, // ✅ Helper reutilizable
//   });

// // SERVICE
// export const PoliticaDesarrolloService = {
//   /**
//    * Lista todas las políticas de desarrollo sin filtros o con búsqueda por texto
//    */
//   listAll: async (
//     limit: number = 10,
//     offset: number = 0,
//     search?: string
//   ): Promise<{ results: PoliticaDesarrollo[]; count: number }> => {
//     try {
//       // Si hay búsqueda, usar searchByText
//       if (search && search.trim()) {
//         return PoliticaDesarrolloService.searchByText(search.trim(), {
//           limit,
//           offset,
//         });
//       }

//       // Sin búsqueda, listar normalmente
//       const response = await fetchGraphQL<{
//         listPoliticasDesarrollo: ListResponse<any>;
//       }>(LIST_POLITICAS_DESARROLLO, { limit, offset });

//       const results = response.listPoliticasDesarrollo.results.map(
//         normalizarPoliticaDesarrollo
//       );

//       return {
//         results,
//         count: response.listPoliticasDesarrollo.count,
//       };
//     } catch (error) {
//       return handleError("listAll", error);
//     }
//   },

//   /**
//    * Busca políticas de desarrollo por texto en descripción
//    */
//   searchByText: async (
//     searchTerm: string,
//     { limit = 10, offset = 0 }: PaginationParams = {}
//   ): Promise<{ results: PoliticaDesarrollo[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         searchPoliticasDesarrollo: ListResponse<any>;
//       }>(SEARCH_POLITICAS_DESARROLLO, {
//         search: searchTerm,
//         limit,
//         offset,
//       });

//       const results = response.searchPoliticasDesarrollo.results.map(
//         normalizarPoliticaDesarrollo
//       );

//       return {
//         results,
//         count: response.searchPoliticasDesarrollo.count,
//       };
//     } catch (error) {
//       return handleError("searchByText", error);
//     }
//   },

//   /**
//    * Filtra políticas por área estratégica específica
//    */
//   filterByArea: async (
//     areaEstrategicaId: number,
//     { limit = 10, offset = 0 }: PaginationParams = {}
//   ): Promise<{ results: PoliticaDesarrollo[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         filterPoliticasPorArea: ListResponse<any>;
//       }>(FILTER_POLITICAS_POR_AREA, { areaEstrategicaId, limit, offset });

//       const results = response.filterPoliticasPorArea.results.map(
//         normalizarPoliticaDesarrollo
//       );

//       return {
//         results,
//         count: response.filterPoliticasPorArea.count,
//       };
//     } catch (error) {
//       return handleError("filterByArea", error);
//     }
//   },

//   /**
//    * Obtiene una política de desarrollo por ID
//    */
//   getById: async (id: number): Promise<PoliticaDesarrollo> => {
//     try {
//       const response = await fetchGraphQL<{
//         getPoliticaDesarrollo: MutationResponse<any>;
//       }>(GET_POLITICA_DESARROLLO, { id });

//       if (
//         !response.getPoliticaDesarrollo.success ||
//         !response.getPoliticaDesarrollo.data
//       ) {
//         throw new Error(
//           response.getPoliticaDesarrollo.message ||
//             "No se encontró la Política de Desarrollo"
//         );
//       }

//       return normalizarPoliticaDesarrollo(response.getPoliticaDesarrollo.data);
//     } catch (error) {
//       return handleError("getById", error);
//     }
//   },

//   /**
//    * Crea una nueva política de desarrollo
//    */
//   create: async (
//     data: CreatePoliticaDesarrolloInput
//   ): Promise<PoliticaDesarrollo> => {
//     try {
//       const variables = {
//         idPd: data.idPd,
//         description: data.description,
//         areaEstrategicaId: data.areaEstrategicaId,
//       };

//       const response = await fetchGraphQL<{
//         createPoliticaDesarrollo: MutationResponse<any>;
//       }>(CREATE_POLITICA_DESARROLLO, variables);

//       if (
//         !response.createPoliticaDesarrollo.success ||
//         !response.createPoliticaDesarrollo.data
//       ) {
//         throw new Error(
//           response.createPoliticaDesarrollo.message ||
//             "No se pudo crear la Política de Desarrollo"
//         );
//       }

//       return normalizarPoliticaDesarrollo(
//         response.createPoliticaDesarrollo.data
//       );
//     } catch (error) {
//       return handleError("create", error);
//     }
//   },

//   /**
//    * Actualiza una política de desarrollo existente
//    */
//   update: async (
//     id: number,
//     data: UpdatePoliticaDesarrolloInput
//   ): Promise<PoliticaDesarrollo> => {
//     try {
//       const variables: Record<string, unknown> = { id };

//       if (data.idPd !== undefined) variables.idPd = data.idPd;
//       if (data.description !== undefined)
//         variables.description = data.description;
//       if (data.areaEstrategicaId !== undefined)
//         variables.areaEstrategicaId = data.areaEstrategicaId;

//       const response = await fetchGraphQL<{
//         updatePoliticaDesarrollo: MutationResponse<any>;
//       }>(UPDATE_POLITICA_DESARROLLO, variables);

//       if (
//         !response.updatePoliticaDesarrollo.success ||
//         !response.updatePoliticaDesarrollo.data
//       ) {
//         throw new Error(
//           response.updatePoliticaDesarrollo.message ||
//             "No se pudo actualizar la Política de Desarrollo"
//         );
//       }

//       return normalizarPoliticaDesarrollo(
//         response.updatePoliticaDesarrollo.data
//       );
//     } catch (error) {
//       return handleError("update", error);
//     }
//   },

//   /**
//    * Elimina una política de desarrollo
//    */
//   delete: async (id: number): Promise<void> => {
//     try {
//       const response = await fetchGraphQL<{
//         deletePoliticaDesarrollo: MutationResponse<boolean>;
//       }>(DELETE_POLITICA_DESARROLLO, { id });

//       if (!response.deletePoliticaDesarrollo.success) {
//         throw new Error(
//           response.deletePoliticaDesarrollo.message ||
//             "No se pudo eliminar la Política de Desarrollo"
//         );
//       }
//     } catch (error) {
//       return handleError("delete", error);
//     }
//   },
// };

// src/modules/pei/services/politicaDesarrollo.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  PoliticaDesarrollo,
  CreatePoliticaDesarrolloInput,
  UpdatePoliticaDesarrolloInput,
} from "@/modules/pei/types/politicaDesarrollo.types";

import {
  LIST_POLITICAS_DESARROLLO,
  SEARCH_POLITICAS_DESARROLLO,
  GET_POLITICA_DESARROLLO,
  FILTER_POLITICAS_POR_AREA,
} from "@/graphql/pei/queries/politicaDesarrollo.queries";

import {
  CREATE_POLITICA_DESARROLLO,
  UPDATE_POLITICA_DESARROLLO,
  DELETE_POLITICA_DESARROLLO,
} from "@/graphql/pei/mutations/politicaDesarrollo.mutations";

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

const handleError = createServiceErrorHandler("PoliticaDesarrolloService");

const normalizarPoliticaDesarrollo = (politica: any): PoliticaDesarrollo => ({
  id: politica.id,
  idPd: politica.idPd,
  description: politica.description,
  areaEstrategica: politica.areaEstrategica || null,
});

export const PoliticaDesarrolloService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: PoliticaDesarrollo[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return PoliticaDesarrolloService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }

      const response = await fetchGraphQL<{
        listPoliticasDesarrollo: ListResponse<any>;
      }>(LIST_POLITICAS_DESARROLLO, { limit, offset });

      const results = response.listPoliticasDesarrollo.results.map(
        normalizarPoliticaDesarrollo
      );

      return {
        results,
        count: response.listPoliticasDesarrollo.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: PoliticaDesarrollo[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchPoliticasDesarrollo: ListResponse<any>;
      }>(SEARCH_POLITICAS_DESARROLLO, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchPoliticasDesarrollo.results.map(
        normalizarPoliticaDesarrollo
      );

      return {
        results,
        count: response.searchPoliticasDesarrollo.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  filterByArea: async (
    areaEstrategicaId: number,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: PoliticaDesarrollo[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterPoliticasPorArea: ListResponse<any>;
      }>(FILTER_POLITICAS_POR_AREA, { areaEstrategicaId, limit, offset });

      const results = response.filterPoliticasPorArea.results.map(
        normalizarPoliticaDesarrollo
      );

      return {
        results,
        count: response.filterPoliticasPorArea.count,
      };
    } catch (error) {
      return handleError("filterByArea", error);
    }
  },

  getById: async (id: number): Promise<PoliticaDesarrollo> => {
    try {
      const response = await fetchGraphQL<{
        getPoliticaDesarrollo: MutationResponse<any>;
      }>(GET_POLITICA_DESARROLLO, { id });

      if (
        !response.getPoliticaDesarrollo.success ||
        !response.getPoliticaDesarrollo.data
      ) {
        throw new Error(
          response.getPoliticaDesarrollo.message ||
            "No se encontró la Política de Desarrollo"
        );
      }

      return normalizarPoliticaDesarrollo(response.getPoliticaDesarrollo.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (
    data: CreatePoliticaDesarrolloInput
  ): Promise<PoliticaDesarrollo> => {
    try {
      const variables = {
        idPd: data.idPd,
        description: data.description,
        areaEstrategicaId: data.areaEstrategicaId,
      };

      const response = await fetchGraphQL<{
        createPoliticaDesarrollo: MutationResponse<any>;
      }>(CREATE_POLITICA_DESARROLLO, variables);

      if (
        !response.createPoliticaDesarrollo.success ||
        !response.createPoliticaDesarrollo.data
      ) {
        throw new Error(
          response.createPoliticaDesarrollo.message ||
            "No se pudo crear la Política de Desarrollo"
        );
      }

      return normalizarPoliticaDesarrollo(
        response.createPoliticaDesarrollo.data
      );
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdatePoliticaDesarrolloInput
  ): Promise<PoliticaDesarrollo> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.idPd !== undefined) variables.idPd = data.idPd;
      if (data.description !== undefined)
        variables.description = data.description;
      if (data.areaEstrategicaId !== undefined)
        variables.areaEstrategicaId = data.areaEstrategicaId;

      const response = await fetchGraphQL<{
        updatePoliticaDesarrollo: MutationResponse<any>;
      }>(UPDATE_POLITICA_DESARROLLO, variables);

      if (
        !response.updatePoliticaDesarrollo.success ||
        !response.updatePoliticaDesarrollo.data
      ) {
        throw new Error(
          response.updatePoliticaDesarrollo.message ||
            "No se pudo actualizar la Política de Desarrollo"
        );
      }

      return normalizarPoliticaDesarrollo(
        response.updatePoliticaDesarrollo.data
      );
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deletePoliticaDesarrollo: MutationResponse<boolean>;
      }>(DELETE_POLITICA_DESARROLLO, { id });

      if (!response.deletePoliticaDesarrollo.success) {
        throw new Error(
          response.deletePoliticaDesarrollo.message ||
            "No se pudo eliminar la Política de Desarrollo"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};
