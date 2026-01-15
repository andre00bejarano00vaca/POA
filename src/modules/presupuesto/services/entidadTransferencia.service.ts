// import { fetchGraphQL } from '@/lib/graphql-client';

// export const EntidadTransferenciaService = {
//   // --- MUTATIONS ---

//   /** Crea una nueva entidad de transferencia vinculada a un rubro */
//   create: async (codigo: number, description: string, rubroId: number) => {
//     const mutation = `
//       mutation CreateEntidadTransferencia($codigo: Int!, $description: String!, $rubroId: Int!) {
//         createEntidadTransferencia(
//           codigo: $codigo
//           description: $description
//           rubroIdRubroId: $rubroId
//         ) {
//           success
//           message
//           data {
//             id
//             codigo
//             description
//             rubro {
//               id
//               description
//             }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { codigo, description, rubroId });
//   },

//   /** Actualiza la descripción de una entidad de transferencia */
//   update: async (id: number, description: string) => {
//     const mutation = `
//       mutation UpdateEntidadTransferencia($id: ID!, $description: String!) {
//         updateEntidadTransferencia(id: $id, description: $description) {
//           success
//           message
//           data {
//             id
//             codigo
//             description
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, description });
//   },

//   /** Elimina una entidad de transferencia */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteEntidadTransferencia($id: ID!) {
//         deleteEntidadTransferencia(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene una entidad de transferencia por ID incluyendo datos del rubro */
//   getById: async (id: number) => {
//     const query = `
//       query GetEntidadTransferencia($id: ID!) {
//         getEntidadTransferencia(id: $id) {
//           success
//           message
//           data {
//             id
//             codigo
//             description
//             rubro {
//               id
//               description
//               importeDouble
//             }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista todas las entidades de transferencia con paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListEntidadesTransferencia($limit: Int, $offset: Int) {
//         listEntidadesTransferencia(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             codigo
//             description
//             rubro {
//               description
//             }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca entidades de transferencia por coincidencia de texto */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchEntidadesTransferencia($search: String!, $limit: Int) {
//         searchEntidadesTransferencia(search: $search, limit: $limit) {
//           count
//           results {
//             id
//             codigo
//             description
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra entidades de transferencia por un rubro específico */
//   filterByRubro: async (rubroId: number, limit = 100) => {
//     const query = `
//       query FilterByRubro($rubroId: Int!, $limit: Int) {
//         filterEntidadTransferenciaPorRubro(rubroId: $rubroId, limit: $limit) {
//           count
//           results {
//             id
//             codigo
//             description
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { rubroId, limit });
//   },

//   /** Utilidades de conteo y validación */
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countEntidadesTransferencia }`),
//     exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsEntidadTransferencia(id: $id) }`, { id })
//   }
// };

// src/modules/presupuesto/services/entidadTransferencia.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import {
  normalizeEntity,
  normalizeRelation,
  passthrough,
} from "@/shared/lib/normalizers";
import type {
  EntidadTransferencia,
  CreateEntidadTransferenciaInput,
  UpdateEntidadTransferenciaInput,
} from "@/modules/presupuesto/types/entidadTransferencia.types";

import {
  LIST_ENTIDADES_TRANSFERENCIA,
  SEARCH_ENTIDADES_TRANSFERENCIA,
  GET_ENTIDAD_TRANSFERENCIA,
} from "@/graphql/presupuesto/queries/entidadTransferencia.queries";

import {
  CREATE_ENTIDAD_TRANSFERENCIA,
  UPDATE_ENTIDAD_TRANSFERENCIA,
  DELETE_ENTIDAD_TRANSFERENCIA,
} from "@/graphql/presupuesto/mutations/entidadTransferencia.mutations";

// ============================================
// TYPES
// ============================================
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

// ERROR HANDLER

const handleError = createServiceErrorHandler("EntidadTransferenciaService");

// NORMALIZER (usando helper reutilizable)

const normalizarEntidadTransferencia = (entity: any): EntidadTransferencia =>
  normalizeEntity<any, EntidadTransferencia>(entity, {
    id: passthrough,
    codigo: passthrough,
    description: passthrough,
    rubro: normalizeRelation,
  });

// SERVICE

export const EntidadTransferenciaService = {
  /**
   * Lista todas las entidades de transferencia sin filtros o con búsqueda por texto
   */
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: EntidadTransferencia[]; count: number }> => {
    try {
      // Si hay búsqueda, usar searchByText
      if (search && search.trim()) {
        return EntidadTransferenciaService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }

      // Sin búsqueda, listar normalmente
      const response = await fetchGraphQL<{
        listEntidadesTransferencia: ListResponse<any>;
      }>(LIST_ENTIDADES_TRANSFERENCIA, { limit, offset });

      const results = response.listEntidadesTransferencia.results.map(
        normalizarEntidadTransferencia
      );

      return {
        results,
        count: response.listEntidadesTransferencia.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  /**
   * Busca entidades de transferencia por texto en descripción
   */
  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: EntidadTransferencia[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchEntidadesTransferencia: ListResponse<any>;
      }>(SEARCH_ENTIDADES_TRANSFERENCIA, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchEntidadesTransferencia.results.map(
        normalizarEntidadTransferencia
      );

      return {
        results,
        count: response.searchEntidadesTransferencia.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  /**
   * Obtiene una entidad de transferencia por ID
   */
  getById: async (id: number): Promise<EntidadTransferencia> => {
    try {
      const response = await fetchGraphQL<{
        getEntidadTransferencia: MutationResponse<any>;
      }>(GET_ENTIDAD_TRANSFERENCIA, { id });

      if (
        !response.getEntidadTransferencia.success ||
        !response.getEntidadTransferencia.data
      ) {
        throw new Error(
          response.getEntidadTransferencia.message ||
            "No se encontró la Entidad de Transferencia"
        );
      }

      return normalizarEntidadTransferencia(
        response.getEntidadTransferencia.data
      );
    } catch (error) {
      return handleError("getById", error);
    }
  },

  /**
   * Crea una nueva entidad de transferencia
   */
  create: async (
    data: CreateEntidadTransferenciaInput
  ): Promise<EntidadTransferencia> => {
    try {
      const variables = {
        codigo: Number(data.codigo),
        description: data.description,
        rubroIdRubroId: Number(data.rubroIdRubroId),
      };

      const response = await fetchGraphQL<{
        createEntidadTransferencia: MutationResponse<any>;
      }>(CREATE_ENTIDAD_TRANSFERENCIA, variables);

      if (
        !response.createEntidadTransferencia.success ||
        !response.createEntidadTransferencia.data
      ) {
        throw new Error(
          response.createEntidadTransferencia.message ||
            "No se pudo crear la Entidad de Transferencia"
        );
      }

      return normalizarEntidadTransferencia(
        response.createEntidadTransferencia.data
      );
    } catch (error) {
      return handleError("create", error);
    }
  },

  /**
   * Actualiza una entidad de transferencia existente
   */
  update: async (
    id: number,
    data: UpdateEntidadTransferenciaInput
  ): Promise<EntidadTransferencia> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.codigo !== undefined) variables.codigo = Number(data.codigo);
      if (data.description !== undefined)
        variables.description = data.description;
      if (data.rubroIdRubroId !== undefined)
        variables.rubroIdRubroId = Number(data.rubroIdRubroId);

      const response = await fetchGraphQL<{
        updateEntidadTransferencia: MutationResponse<any>;
      }>(UPDATE_ENTIDAD_TRANSFERENCIA, variables);

      if (
        !response.updateEntidadTransferencia.success ||
        !response.updateEntidadTransferencia.data
      ) {
        throw new Error(
          response.updateEntidadTransferencia.message ||
            "No se pudo actualizar la Entidad de Transferencia"
        );
      }

      return normalizarEntidadTransferencia(
        response.updateEntidadTransferencia.data
      );
    } catch (error) {
      return handleError("update", error);
    }
  },

  /**
   * Elimina una entidad de transferencia
   */
  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteEntidadTransferencia: MutationResponse<boolean>;
      }>(DELETE_ENTIDAD_TRANSFERENCIA, { id });

      if (!response.deleteEntidadTransferencia.success) {
        throw new Error(
          response.deleteEntidadTransferencia.message ||
            "No se pudo eliminar la Entidad de Transferencia"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};
