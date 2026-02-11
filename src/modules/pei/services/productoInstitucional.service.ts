// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const ProductoInstitucionalService = {
//   // --- MUTATIONS ---

//   /** Crea un nuevo producto institucional vinculado a una acción estratégica  */
//   create: async (
//     idPi: number,
//     description: string,
//     accionEstrategicaId: number
//   ) => {
//     const mutation = `
//       mutation CreateProducto($idPi: Int!, $description: String!, $accionEstrategicaId: Int!) {
//         createProductoInstitucion(
//           idPi: $idPi
//           description: $description
//           accionEstrategicaId: $accionEstrategicaId
//         ) {
//           success
//           message
//           data { id idPi description accionEstrategicaId }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, {
//       idPi,
//       description,
//       accionEstrategicaId,
//     });
//   },

//   /** Actualiza la descripción de un producto institucional existente */
//   update: async (id: number, description: string) => {
//     const mutation = `
//       mutation UpdateProducto($id: ID!, $description: String!) {
//         updateProductoInstitucion(id: $id, description: $description) {
//           success
//           message
//           data { id idPi description accionEstrategica { description } }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, description });
//   },

//   /** Elimina un producto institucional por su ID interno */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteProducto($id: ID!) {
//         deleteProductoInstitucion(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene un producto institucional por su ID interno  */
//   getById: async (id: number) => {
//     const query = `
//       query GetProducto($id: ID!) {
//         getProductoInstitucion(id: $id) {
//           success
//           message
//           data { id idPi description accionEstrategica { description } }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista los productos institucionales con soporte para paginación  */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListProductos($limit: Int, $offset: Int) {
//         listProductosInstitucion(limit: $limit, offset: $offset) {
//           count
//           results { id idPi description accionEstrategica { description } }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca productos por coincidencia de texto en la descripción  */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchProductos($search: String!, $limit: Int) {
//         searchProductosInstitucion(search: $search, limit: $limit) {
//           count
//           results { id idPi description accionEstrategica { description } }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra productos por una acción estratégica específica  */
//   filterByAccion: async (accionEstrategicaId: number, limit = 100) => {
//     const query = `
//       query FilterByAccion($accionEstrategicaId: Int!, $limit: Int) {
//         filterProductosPorAccion(accionEstrategicaId: $accionEstrategicaId, limit: $limit) {
//           count
//           results { id idPi description accionEstrategica { description } }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { accionEstrategicaId, limit });
//   },

//   /** Obtiene un producto filtrando por su código id_pi único  */
//   filterByIdPi: async (idPi: number) => {
//     const query = `
//       query FilterByIdPi($idPi: Int!) {
//         filterProductoPorIdPi(idPi: $idPi) {
//           success
//           message
//           data { id idPi description accionEstrategica { description } }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { idPi });
//   },

//   /** Obtiene la lista ordenada (ej: "-id", "id_pi" o "description")  */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetOrdered($orderBy: String, $limit: Int) {
//         getProductosInstitucionOrdenados(orderBy: $orderBy, limit: $limit) {
//           count
//           results { id idPi description accionEstrategica { description } }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },

//   /** Utilidades para contar y verificar existencia*/
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countProductosInstitucion }`),
//     exists: (id: number) =>
//       fetchGraphQL<any>(
//         `query Exists($id: ID!) { existsProductoInstitucion(id: $id) }`,
//         { id }
//       ),
//   },
// };

// src/modules/pei/services/productoInstitucional.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import {
  normalizeEntity,
  normalizeRelation,
  passthrough,
} from "@/shared/lib/normalizers";
import type {
  ProductoInstitucional,
  CreateProductoInstitucionalInput,
  UpdateProductoInstitucionalInput,
} from "../types/productoInstitucional.types";

import {
  LIST_PRODUCTOS_INSTITUCIONALES,
  SEARCH_PRODUCTOS_INSTITUCIONALES,
  GET_PRODUCTO_INSTITUCIONAL,
} from "@/graphql/pei/queries/productoInstitucional.queries";

import {
  CREATE_PRODUCTO_INSTITUCIONAL,
  UPDATE_PRODUCTO_INSTITUCIONAL,
  DELETE_PRODUCTO_INSTITUCIONAL,
} from "@/graphql/pei/mutations/productoInstitucional.mutations";

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

const handleError = createServiceErrorHandler("ProductoInstitucionalService");

const normalizarProductoInstitucional = (
  producto: any
): ProductoInstitucional =>
  normalizeEntity<any, ProductoInstitucional>(producto, {
    id: passthrough,
    idPi: passthrough,
    description: passthrough,
    accionEstrategica: normalizeRelation,
  });

export const ProductoInstitucionalService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: ProductoInstitucional[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return ProductoInstitucionalService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }

      const response = await fetchGraphQL<{
        listProductosInstitucion: ListResponse<any>;
      }>(LIST_PRODUCTOS_INSTITUCIONALES, { limit, offset });

      const results = response.listProductosInstitucion.results.map(
        normalizarProductoInstitucional
      );

      return {
        results,
        count: response.listProductosInstitucion.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: ProductoInstitucional[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchProductosInstitucion: ListResponse<any>;
      }>(SEARCH_PRODUCTOS_INSTITUCIONALES, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchProductosInstitucion.results.map(
        normalizarProductoInstitucional
      );

      return {
        results,
        count: response.searchProductosInstitucion.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  getById: async (id: number): Promise<ProductoInstitucional> => {
    try {
      const response = await fetchGraphQL<{
        getProductoInstitucion: MutationResponse<any>;
      }>(GET_PRODUCTO_INSTITUCIONAL, { id });

      if (
        !response.getProductoInstitucion.success ||
        !response.getProductoInstitucion.data
      ) {
        throw new Error(
          response.getProductoInstitucion.message ||
            "No se encontró el Producto Institucional"
        );
      }

      return normalizarProductoInstitucional(
        response.getProductoInstitucion.data
      );
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (
    data: CreateProductoInstitucionalInput
  ): Promise<ProductoInstitucional> => {
    try {
      const variables = {
        idPi: data.idPi,
        description: data.description,
        accionEstrategicaId: data.accionEstrategicaId,
      };

      const response = await fetchGraphQL<{
        createProductoInstitucion: MutationResponse<any>;
      }>(CREATE_PRODUCTO_INSTITUCIONAL, variables);

      if (
        !response.createProductoInstitucion.success ||
        !response.createProductoInstitucion.data
      ) {
        throw new Error(
          response.createProductoInstitucion.message ||
            "No se pudo crear el Producto Institucional"
        );
      }

      return normalizarProductoInstitucional(
        response.createProductoInstitucion.data
      );
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateProductoInstitucionalInput
  ): Promise<ProductoInstitucional> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.idPi !== undefined) variables.idPi = data.idPi;
      if (data.description !== undefined)
        variables.description = data.description;
      if (data.accionEstrategicaId !== undefined)
        variables.accionEstrategicaId = data.accionEstrategicaId;

      const response = await fetchGraphQL<{
        updateProductoInstitucion: MutationResponse<any>;
      }>(UPDATE_PRODUCTO_INSTITUCIONAL, variables);

      if (
        !response.updateProductoInstitucion.success ||
        !response.updateProductoInstitucion.data
      ) {
        throw new Error(
          response.updateProductoInstitucion.message ||
            "No se pudo actualizar el Producto Institucional"
        );
      }

      return normalizarProductoInstitucional(
        response.updateProductoInstitucion.data
      );
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteProductoInstitucion: MutationResponse<boolean>;
      }>(DELETE_PRODUCTO_INSTITUCIONAL, { id });

      if (!response.deleteProductoInstitucion.success) {
        throw new Error(
          response.deleteProductoInstitucion.message ||
            "No se pudo eliminar el Producto Institucional"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};
