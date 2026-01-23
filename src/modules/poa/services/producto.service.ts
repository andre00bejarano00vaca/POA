// src/modules/poa/services/producto.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  Producto,
  CreateProductoInput,
  UpdateProductoInput,
} from "@/modules/poa/types/producto.types";

import {
  LIST_PRODUCTOS,
  GET_PRODUCTO,
  SEARCH_PRODUCTOS,
  GET_PRODUCTOS_ORDENADOS,
  COUNT_PRODUCTOS,
  EXISTS_PRODUCTO,
} from "@/graphql/poa/queries/producto.queries";

import {
  CREATE_PRODUCTO,
  UPDATE_PRODUCTO,
  DELETE_PRODUCTO,
} from "@/graphql/poa/mutations/producto.mutations";

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

const handleError = createServiceErrorHandler("ProductoService");

const normalizarProducto = (producto: any): Producto => ({
  id: producto.id,
  description: producto.description,
  accionCortoPlazo: producto.accionCortoPlazo || null,
});

export const ProductoService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string,
  ): Promise<{ results: Producto[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return ProductoService.searchByText(search.trim(), { limit, offset });
      }

      const response = await fetchGraphQL<{
        listProductos: ListResponse<any>;
      }>(LIST_PRODUCTOS, { limit, offset });

      const results = response.listProductos.results.map(normalizarProducto);

      return {
        results,
        count: response.listProductos.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Producto[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchProductos: ListResponse<any>;
      }>(SEARCH_PRODUCTOS, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchProductos.results.map(normalizarProducto);

      return {
        results,
        count: response.searchProductos.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  getOrdenados: async (
    orderBy: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Producto[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getProductosOrdenados: ListResponse<any>;
      }>(GET_PRODUCTOS_ORDENADOS, { orderBy, limit, offset });

      const results =
        response.getProductosOrdenados.results.map(normalizarProducto);

      return {
        results,
        count: response.getProductosOrdenados.count,
      };
    } catch (error) {
      return handleError("getOrdenados", error);
    }
  },

  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countProductos: number;
      }>(COUNT_PRODUCTOS, {});

      return response.countProductos;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsProducto: boolean;
      }>(EXISTS_PRODUCTO, { id });

      return response.existsProducto;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getById: async (id: number): Promise<Producto> => {
    try {
      const response = await fetchGraphQL<{
        getProducto: MutationResponse<any>;
      }>(GET_PRODUCTO, { id });

      if (!response.getProducto.success || !response.getProducto.data) {
        throw new Error(
          response.getProducto.message || "No se encontró el Producto",
        );
      }

      return normalizarProducto(response.getProducto.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (data: CreateProductoInput): Promise<Producto> => {
    try {
      const variables = {
        description: data.description,
        accionCortoPlazoId: data.accionCortoPlazoId,
      };

      const response = await fetchGraphQL<{
        createProducto: MutationResponse<any>;
      }>(CREATE_PRODUCTO, variables);

      if (!response.createProducto.success || !response.createProducto.data) {
        throw new Error(
          response.createProducto.message || "No se pudo crear el Producto",
        );
      }

      return normalizarProducto(response.createProducto.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (id: number, data: UpdateProductoInput): Promise<Producto> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.accionCortoPlazoId !== undefined)
        variables.accionCortoPlazoId = data.accionCortoPlazoId;

      const response = await fetchGraphQL<{
        updateProducto: MutationResponse<any>;
      }>(UPDATE_PRODUCTO, variables);

      if (!response.updateProducto.success || !response.updateProducto.data) {
        throw new Error(
          response.updateProducto.message ||
            "No se pudo actualizar el Producto",
        );
      }

      return normalizarProducto(response.updateProducto.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteProducto: MutationResponse<boolean>;
      }>(DELETE_PRODUCTO, { id });

      if (!response.deleteProducto.success) {
        throw new Error(
          response.deleteProducto.message || "No se pudo eliminar el Producto",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};
