// import { fetchGraphQL } from '@/lib/graphql-client';

// export const ObjetoGastoService = {
//   // --- MUTATIONS ---

//   /** Crea un nuevo Objeto de Gasto vinculado a financiamiento */
//   create: async (variables: {
//     description: string;
//     importeDouble: number;
//     entidadTransferenciaId: number;
//     organismoId: number;
//   }) => {
//     const mutation = `
//       mutation CreateObjetoGasto($desc: String!, $imp: Float!, $etId: Int!, $orgId: Int!) {
//         createObjetoGasto(
//           description: $desc
//           importeDouble: $imp
//           entidadTransferenciaIdEtId: $etId
//           organismoIdOrgId: $orgId
//         ) {
//           success
//           message
//           data {
//             id
//             description
//             importeDouble
//             entidadTransferenciaIdEt { id description }
//             organismoIdOrg { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, {
//       desc: variables.description,
//       imp: variables.importeDouble,
//       etId: variables.entidadTransferenciaId,
//       orgId: variables.organismoId
//     });
//   },

//   /** Actualiza la descripción o el importe del gasto */
//   update: async (id: number, description: string, importeDouble: number) => {
//     const mutation = `
//       mutation UpdateObjetoGasto($id: ID!, $desc: String!, $imp: Float!) {
//         updateObjetoGasto(id: $id, description: $desc, importeDouble: $imp) {
//           success
//           message
//           data {
//             id
//             description
//             importeDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, desc: description, imp: importeDouble });
//   },

//   /** Elimina un objeto de gasto */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteObjetoGasto($id: ID!) {
//         deleteObjetoGasto(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene un Objeto de Gasto con todo su detalle de origen de fondos */
//   getById: async (id: number) => {
//     const query = `
//       query GetObjetoGasto($id: ID!) {
//         getObjetoGasto(id: $id) {
//           success
//           message
//           data {
//             id
//             description
//             importeDouble
//             entidadTransferenciaIdEt {
//               id
//               codigo
//               description
//             }
//             organismoIdOrg {
//               id
//               codigo
//               description
//             }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista todos los objetos de gasto con paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListObjetoGastos($limit: Int, $offset: Int) {
//         listObjetoGastos(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             description
//             importeDouble
//             organismoIdOrg { description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca objetos de gasto por descripción (ej: "PAPEL") */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchObjetoGastos($search: String!, $limit: Int) {
//         searchObjetoGastos(search: $search, limit: $limit) {
//           count
//           results {
//             id
//             description
//             importeDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra por Organismo financiador específico */
//   filterByOrganismo: async (organismoId: number, limit = 100) => {
//     const query = `
//       query FilterByOrg($orgId: Int!, $limit: Int) {
//         filterObjetoGastoPorOrganismo(organismoId: $orgId, limit: $limit) {
//           count
//           results {
//             id
//             description
//             importeDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orgId: organismoId, limit });
//   },

//   /** Utilidades de conteo y validación */
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countObjetoGastos }`),
//     exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsObjetoGasto(id: $id) }`, { id })
//   }
// };

// src/modules/presupuesto/services/objetoGasto.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import {
  normalizeEntity,
  normalizeRelation,
  passthrough,
} from "@/shared/lib/normalizers";
import type {
  ObjetoGasto,
  CreateObjetoGastoInput,
  UpdateObjetoGastoInput,
} from "@/modules/presupuesto/types/objetoGasto.types";

import {
  LIST_OBJETOS_GASTO,
  SEARCH_OBJETOS_GASTO,
  GET_OBJETO_GASTO,
} from "@/graphql/presupuesto/queries/objetoGasto.queries";

import {
  CREATE_OBJETO_GASTO,
  UPDATE_OBJETO_GASTO,
  DELETE_OBJETO_GASTO,
} from "@/graphql/presupuesto/mutations/objetoGasto.mutations";

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

const handleError = createServiceErrorHandler("ObjetoGastoService");

const normalizarObjetoGasto = (obj: any): ObjetoGasto =>
  normalizeEntity<any, ObjetoGasto>(obj, {
    id: passthrough,
    description: passthrough,
    importeDouble: passthrough,
    entidadTransferenciaIdEt: normalizeRelation,
    organismoIdOrg: normalizeRelation,
  });

export const ObjetoGastoService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: ObjetoGasto[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return ObjetoGastoService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }

      const response = await fetchGraphQL<{
        listObjetosGasto: ListResponse<any>;
      }>(LIST_OBJETOS_GASTO, { limit, offset });

      const results = response.listObjetosGasto.results.map(
        normalizarObjetoGasto
      );

      return {
        results,
        count: response.listObjetosGasto.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: ObjetoGasto[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchObjetosGasto: ListResponse<any>;
      }>(SEARCH_OBJETOS_GASTO, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchObjetosGasto.results.map(
        normalizarObjetoGasto
      );

      return {
        results,
        count: response.searchObjetosGasto.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  getById: async (id: number): Promise<ObjetoGasto> => {
    try {
      const response = await fetchGraphQL<{
        getObjetoGasto: MutationResponse<any>;
      }>(GET_OBJETO_GASTO, { id });

      if (!response.getObjetoGasto.success || !response.getObjetoGasto.data) {
        throw new Error(
          response.getObjetoGasto.message || "No se encontró el Objeto de Gasto"
        );
      }

      return normalizarObjetoGasto(response.getObjetoGasto.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (data: CreateObjetoGastoInput): Promise<ObjetoGasto> => {
    try {
      const variables = {
        description: data.description,
        importeDouble: data.importeDouble,
        entidadTransferenciaIdEtId: data.entidadTransferenciaIdEtId,
        organismoIdOrgId: data.organismoIdOrgId,
      };

      const response = await fetchGraphQL<{
        createObjetoGasto: MutationResponse<any>;
      }>(CREATE_OBJETO_GASTO, variables);

      if (
        !response.createObjetoGasto.success ||
        !response.createObjetoGasto.data
      ) {
        throw new Error(
          response.createObjetoGasto.message ||
            "No se pudo crear el Objeto de Gasto"
        );
      }

      return normalizarObjetoGasto(response.createObjetoGasto.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateObjetoGastoInput
  ): Promise<ObjetoGasto> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.importeDouble !== undefined)
        variables.importeDouble = data.importeDouble;
      if (data.entidadTransferenciaIdEtId !== undefined)
        variables.entidadTransferenciaIdEtId = data.entidadTransferenciaIdEtId;
      if (data.organismoIdOrgId !== undefined)
        variables.organismoIdOrgId = data.organismoIdOrgId;

      const response = await fetchGraphQL<{
        updateObjetoGasto: MutationResponse<any>;
      }>(UPDATE_OBJETO_GASTO, variables);

      if (
        !response.updateObjetoGasto.success ||
        !response.updateObjetoGasto.data
      ) {
        throw new Error(
          response.updateObjetoGasto.message ||
            "No se pudo actualizar el Objeto de Gasto"
        );
      }

      return normalizarObjetoGasto(response.updateObjetoGasto.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteObjetoGasto: MutationResponse<boolean>;
      }>(DELETE_OBJETO_GASTO, { id });

      if (!response.deleteObjetoGasto.success) {
        throw new Error(
          response.deleteObjetoGasto.message ||
            "No se pudo eliminar el Objeto de Gasto"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};
