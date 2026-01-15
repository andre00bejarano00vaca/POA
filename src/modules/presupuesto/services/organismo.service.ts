// // src/services/organismo.service.ts

// import { fetchGraphQL } from "@/shared/lib/graphql-client";
// import type {
//   Organismo,
//   CreateOrganismoInput,
//   UpdateOrganismoInput,
// } from "@/modules/presupuesto/types/organismo.types";

// interface MutationResponse<T> {
//   success: boolean;
//   message: string;
//   data: T | null;
// }

// interface ListResponse<T> {
//   count: number;
//   results: T[];
// }

// // Helper para normalizar organismos
// const normalizarOrganismo = (org: any): Organismo => ({
//   id: org.id,
//   codigo: org.codigo,
//   description: org.description,
//   fuentes: org.fuentes || [],
// });

// export const OrganismoService = {
//   listAll: async (
//     limit: number = 10,
//     offset: number = 0,
//     search?: string
//   ): Promise<{ results: Organismo[]; count: number }> => {
//     if (!search || !search.trim()) {
//       return OrganismoService._listOrganismosNormal(limit, offset);
//     }

//     const searchTerm = search.trim();
//     return OrganismoService._searchByText(searchTerm, limit, offset);
//   },

//   _listOrganismosNormal: async (
//     limit: number,
//     offset: number
//   ): Promise<{ results: Organismo[]; count: number }> => {
//     const query = `
//       query ListOrganismos($limit: Int!, $offset: Int!) {
//         listOrganismos(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             codigo
//             description
//             fuentes {
//               id
//               codigo
//               description
//             }
//           }
//         }
//       }
//     `;

//     try {
//       const response = await fetchGraphQL<{
//         listOrganismos: ListResponse<any>;
//       }>(query, { limit, offset });

//       const results = response.listOrganismos.results.map(normalizarOrganismo);

//       return {
//         results,
//         count: response.listOrganismos.count,
//       };
//     } catch (error: any) {
//       console.error("Error en _listOrganismosNormal:", error);
//       throw new Error(
//         error.message || "Error al cargar la lista de Organismos"
//       );
//     }
//   },

//   _searchByText: async (
//     searchTerm: string,
//     limit: number,
//     offset: number
//   ): Promise<{ results: Organismo[]; count: number }> => {
//     const query = `
//       query SearchOrganismos($search: String!, $limit: Int!, $offset: Int!) {
//         searchOrganismos(search: $search, limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             codigo
//             description
//             fuentes {
//               id
//               codigo
//               description
//             }
//           }
//         }
//       }
//     `;

//     try {
//       const response = await fetchGraphQL<{
//         searchOrganismos: ListResponse<any>;
//       }>(query, { search: searchTerm, limit, offset });

//       const results =
//         response.searchOrganismos.results.map(normalizarOrganismo);

//       return {
//         results,
//         count: response.searchOrganismos.count,
//       };
//     } catch (error: any) {
//       console.error("Error en _searchByText:", error);
//       throw new Error(error.message || `Error al buscar "${searchTerm}"`);
//     }
//   },

//   getById: async (id: number): Promise<Organismo> => {
//     const query = `
//       query GetOrganismo($id: Int!) {
//         getOrganismo(id: $id) {
//           success
//           message
//           data {
//             id
//             codigo
//             description
//             fuentes {
//               id
//               codigo
//               description
//             }
//           }
//         }
//       }
//     `;

//     try {
//       const response = await fetchGraphQL<{
//         getOrganismo: MutationResponse<any>;
//       }>(query, { id });

//       if (!response.getOrganismo.success) {
//         throw new Error(response.getOrganismo.message);
//       }

//       if (!response.getOrganismo.data) {
//         throw new Error("No se encontró el Organismo");
//       }

//       return normalizarOrganismo(response.getOrganismo.data);
//     } catch (error: any) {
//       console.error("Error en OrganismoService.getById:", error);
//       throw new Error(error.message || "Error al obtener el Organismo");
//     }
//   },

//   create: async (data: CreateOrganismoInput): Promise<Organismo> => {
//     const mutation = `
//       mutation CreateOrganismo(
//         $codigo: Int!,
//         $description: String!
//       ) {
//         createOrganismo(
//           codigo: $codigo,
//           description: $description
//         ) {
//           success
//           message
//           data {
//             id
//             codigo
//             description
//             fuentes {
//               id
//               codigo
//               description
//             }
//           }
//         }
//       }
//     `;

//     try {
//       const variables = {
//         codigo: data.codigo,
//         description: data.description,
//       };

//       const response = await fetchGraphQL<{
//         createOrganismo: MutationResponse<any>;
//       }>(mutation, variables);

//       if (!response.createOrganismo.success) {
//         throw new Error(response.createOrganismo.message);
//       }

//       if (!response.createOrganismo.data) {
//         throw new Error("No se pudo crear el Organismo");
//       }

//       return normalizarOrganismo(response.createOrganismo.data);
//     } catch (error: any) {
//       console.error("Error en OrganismoService.create:", error);
//       throw new Error(error.message || "Error al crear el Organismo");
//     }
//   },

//   update: async (
//     id: number,
//     data: UpdateOrganismoInput
//   ): Promise<Organismo> => {
//     const mutation = `
//       mutation UpdateOrganismo(
//         $id: Int!,
//         $codigo: Int,
//         $description: String
//       ) {
//         updateOrganismo(
//           id: $id,
//           codigo: $codigo,
//           description: $description
//         ) {
//           success
//           message
//           data {
//             id
//             codigo
//             description
//             fuentes {
//               id
//               codigo
//               description
//             }
//           }
//         }
//       }
//     `;

//     try {
//       const variables: any = { id };

//       if (data.codigo !== undefined) variables.codigo = data.codigo;
//       if (data.description !== undefined)
//         variables.description = data.description;

//       const response = await fetchGraphQL<{
//         updateOrganismo: MutationResponse<any>;
//       }>(mutation, variables);

//       if (!response.updateOrganismo.success) {
//         throw new Error(response.updateOrganismo.message);
//       }

//       if (!response.updateOrganismo.data) {
//         throw new Error("No se pudo actualizar el Organismo");
//       }

//       return normalizarOrganismo(response.updateOrganismo.data);
//     } catch (error: any) {
//       console.error("Error en OrganismoService.update:", error);
//       throw new Error(error.message || "Error al actualizar el Organismo");
//     }
//   },

//   delete: async (id: number): Promise<void> => {
//     const mutation = `
//       mutation DeleteOrganismo($id: Int!) {
//         deleteOrganismo(id: $id) {
//           success
//           message
//           data
//         }
//       }
//     `;

//     try {
//       const response = await fetchGraphQL<{
//         deleteOrganismo: MutationResponse<boolean>;
//       }>(mutation, { id });

//       if (!response.deleteOrganismo.success) {
//         throw new Error(response.deleteOrganismo.message);
//       }
//     } catch (error: any) {
//       console.error("Error en OrganismoService.delete:", error);
//       throw new Error(error.message || "Error al eliminar el Organismo");
//     }
//   },

//   addFuenteToOrganismo: async (
//     organismoId: number,
//     fuenteId: number
//   ): Promise<Organismo> => {
//     const mutation = `
//       mutation AddFuenteToOrganismo($organismoId: Int!, $fuenteId: Int!) {
//         addFuenteToOrganismo(organismoId: $organismoId, fuenteId: $fuenteId) {
//           success
//           message
//           data {
//             id
//             codigo
//             description
//             fuentes {
//               id
//               codigo
//               description
//             }
//           }
//         }
//       }
//     `;

//     try {
//       const response = await fetchGraphQL<{
//         addFuenteToOrganismo: MutationResponse<any>;
//       }>(mutation, { organismoId, fuenteId });

//       if (!response.addFuenteToOrganismo.success) {
//         throw new Error(response.addFuenteToOrganismo.message);
//       }

//       if (!response.addFuenteToOrganismo.data) {
//         throw new Error("No se pudo agregar la Fuente al Organismo");
//       }

//       return normalizarOrganismo(response.addFuenteToOrganismo.data);
//     } catch (error: any) {
//       console.error("Error en OrganismoService.addFuenteToOrganismo:", error);
//       throw new Error(
//         error.message || "Error al agregar la Fuente al Organismo"
//       );
//     }
//   },

//   removeFuenteFromOrganismo: async (
//     organismoId: number,
//     fuenteId: number
//   ): Promise<Organismo> => {
//     const mutation = `
//       mutation RemoveFuenteFromOrganismo($organismoId: Int!, $fuenteId: Int!) {
//         removeFuenteFromOrganismo(organismoId: $organismoId, fuenteId: $fuenteId) {
//           success
//           message
//           data {
//             id
//             codigo
//             description
//             fuentes {
//               id
//               codigo
//               description
//             }
//           }
//         }
//       }
//     `;

//     try {
//       const response = await fetchGraphQL<{
//         removeFuenteFromOrganismo: MutationResponse<any>;
//       }>(mutation, { organismoId, fuenteId });

//       if (!response.removeFuenteFromOrganismo.success) {
//         throw new Error(response.removeFuenteFromOrganismo.message);
//       }

//       if (!response.removeFuenteFromOrganismo.data) {
//         throw new Error("No se pudo remover la Fuente del Organismo");
//       }

//       return normalizarOrganismo(response.removeFuenteFromOrganismo.data);
//     } catch (error: any) {
//       console.error(
//         "Error en OrganismoService.removeFuenteFromOrganismo:",
//         error
//       );
//       throw new Error(
//         error.message || "Error al remover la Fuente del Organismo"
//       );
//     }
//   },
// };

// src/modules/presupuesto/services/organismo.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import {
  normalizeEntity,
  normalizeRelationArray,
  passthrough,
} from "@/shared/lib/normalizers";
import type {
  Organismo,
  CreateOrganismoInput,
  UpdateOrganismoInput,
} from "@/modules/presupuesto/types/organismo.types";

import {
  LIST_ORGANISMOS,
  SEARCH_ORGANISMOS,
  GET_ORGANISMO,
} from "@/graphql/presupuesto/queries/organismo.queries";

import {
  CREATE_ORGANISMO,
  UPDATE_ORGANISMO,
  DELETE_ORGANISMO,
  ADD_FUENTE_TO_ORGANISMO,
  REMOVE_FUENTE_FROM_ORGANISMO,
} from "@/graphql/presupuesto/mutations/organismo.mutations";

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

const handleError = createServiceErrorHandler("OrganismoService");

const normalizarOrganismo = (org: any): Organismo =>
  normalizeEntity<any, Organismo>(org, {
    id: passthrough,
    codigo: passthrough,
    description: passthrough,
    fuentes: normalizeRelationArray,
  });

export const OrganismoService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: Organismo[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return OrganismoService.searchByText(search.trim(), { limit, offset });
      }

      const response = await fetchGraphQL<{
        listOrganismos: ListResponse<any>;
      }>(LIST_ORGANISMOS, { limit, offset });

      const results = response.listOrganismos.results.map(normalizarOrganismo);

      return {
        results,
        count: response.listOrganismos.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: Organismo[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchOrganismos: ListResponse<any>;
      }>(SEARCH_ORGANISMOS, {
        search: searchTerm,
        limit,
        offset,
      });

      const results =
        response.searchOrganismos.results.map(normalizarOrganismo);

      return {
        results,
        count: response.searchOrganismos.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  getById: async (id: number): Promise<Organismo> => {
    try {
      const response = await fetchGraphQL<{
        getOrganismo: MutationResponse<any>;
      }>(GET_ORGANISMO, { id });

      if (!response.getOrganismo.success || !response.getOrganismo.data) {
        throw new Error(
          response.getOrganismo.message || "No se encontró el Organismo"
        );
      }

      return normalizarOrganismo(response.getOrganismo.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (data: CreateOrganismoInput): Promise<Organismo> => {
    try {
      const variables = {
        codigo: data.codigo,
        description: data.description,
      };

      const response = await fetchGraphQL<{
        createOrganismo: MutationResponse<any>;
      }>(CREATE_ORGANISMO, variables);

      if (!response.createOrganismo.success || !response.createOrganismo.data) {
        throw new Error(
          response.createOrganismo.message || "No se pudo crear el Organismo"
        );
      }

      return normalizarOrganismo(response.createOrganismo.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateOrganismoInput
  ): Promise<Organismo> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.codigo !== undefined) variables.codigo = data.codigo;
      if (data.description !== undefined)
        variables.description = data.description;

      const response = await fetchGraphQL<{
        updateOrganismo: MutationResponse<any>;
      }>(UPDATE_ORGANISMO, variables);

      if (!response.updateOrganismo.success || !response.updateOrganismo.data) {
        throw new Error(
          response.updateOrganismo.message ||
            "No se pudo actualizar el Organismo"
        );
      }

      return normalizarOrganismo(response.updateOrganismo.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteOrganismo: MutationResponse<boolean>;
      }>(DELETE_ORGANISMO, { id });

      if (!response.deleteOrganismo.success) {
        throw new Error(
          response.deleteOrganismo.message || "No se pudo eliminar el Organismo"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },

  addFuenteToOrganismo: async (
    organismoId: number,
    fuenteId: number
  ): Promise<Organismo> => {
    try {
      const response = await fetchGraphQL<{
        addFuenteToOrganismo: MutationResponse<any>;
      }>(ADD_FUENTE_TO_ORGANISMO, { organismoId, fuenteId });

      if (
        !response.addFuenteToOrganismo.success ||
        !response.addFuenteToOrganismo.data
      ) {
        throw new Error(
          response.addFuenteToOrganismo.message ||
            "No se pudo agregar la Fuente al Organismo"
        );
      }

      return normalizarOrganismo(response.addFuenteToOrganismo.data);
    } catch (error) {
      return handleError("addFuenteToOrganismo", error);
    }
  },

  removeFuenteFromOrganismo: async (
    organismoId: number,
    fuenteId: number
  ): Promise<Organismo> => {
    try {
      const response = await fetchGraphQL<{
        removeFuenteFromOrganismo: MutationResponse<any>;
      }>(REMOVE_FUENTE_FROM_ORGANISMO, { organismoId, fuenteId });

      if (
        !response.removeFuenteFromOrganismo.success ||
        !response.removeFuenteFromOrganismo.data
      ) {
        throw new Error(
          response.removeFuenteFromOrganismo.message ||
            "No se pudo remover la Fuente del Organismo"
        );
      }

      return normalizarOrganismo(response.removeFuenteFromOrganismo.data);
    } catch (error) {
      return handleError("removeFuenteFromOrganismo", error);
    }
  },
};
