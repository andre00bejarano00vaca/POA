import { fetchGraphQL } from '@/lib/graphql-client';

export const ProductoInstitucionalService = {
  // --- MUTATIONS ---

  /** Crea un nuevo producto institucional vinculado a una acción estratégica  */
  create: async (idPi: number, description: string, accionEstrategicaId: number) => {
    const mutation = `
      mutation CreateProducto($idPi: Int!, $description: String!, $accionEstrategicaId: Int!) {
        createProductoInstitucion(
          idPi: $idPi
          description: $description
          accionEstrategicaId: $accionEstrategicaId
        ) {
          success
          message
          data { id idPi description accionEstrategicaId }
        }
      }`;
    return fetchGraphQL<any>(mutation, { idPi, description, accionEstrategicaId });
  },

  /** Actualiza la descripción de un producto institucional existente */
  update: async (id: number, description: string) => {
    const mutation = `
      mutation UpdateProducto($id: ID!, $description: String!) {
        updateProductoInstitucion(id: $id, description: $description) {
          success
          message
          data { id idPi description accionEstrategica { description } }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, description });
  },

  /** Elimina un producto institucional por su ID interno */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteProducto($id: ID!) {
        deleteProductoInstitucion(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene un producto institucional por su ID interno  */
  getById: async (id: number) => {
    const query = `
      query GetProducto($id: ID!) {
        getProductoInstitucion(id: $id) {
          success
          message
          data { id idPi description accionEstrategica { description } }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista los productos institucionales con soporte para paginación  */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListProductos($limit: Int, $offset: Int) {
        listProductosInstitucion(limit: $limit, offset: $offset) {
          count
          results { id idPi description accionEstrategica { description } }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca productos por coincidencia de texto en la descripción  */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchProductos($search: String!, $limit: Int) {
        searchProductosInstitucion(search: $search, limit: $limit) {
          count
          results { id idPi description accionEstrategica { description } }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Filtra productos por una acción estratégica específica  */
  filterByAccion: async (accionEstrategicaId: number, limit = 100) => {
    const query = `
      query FilterByAccion($accionEstrategicaId: Int!, $limit: Int) {
        filterProductosPorAccion(accionEstrategicaId: $accionEstrategicaId, limit: $limit) {
          count
          results { id idPi description accionEstrategica { description } }
        }
      }`;
    return fetchGraphQL<any>(query, { accionEstrategicaId, limit });
  },

  /** Obtiene un producto filtrando por su código id_pi único  */
  filterByIdPi: async (idPi: number) => {
    const query = `
      query FilterByIdPi($idPi: Int!) {
        filterProductoPorIdPi(idPi: $idPi) {
          success
          message
          data { id idPi description accionEstrategica { description } }
        }
      }`;
    return fetchGraphQL<any>(query, { idPi });
  },

  /** Obtiene la lista ordenada (ej: "-id", "id_pi" o "description")  */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getProductosInstitucionOrdenados(orderBy: $orderBy, limit: $limit) {
          count
          results { id idPi description accionEstrategica { description } }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Utilidades para contar y verificar existencia*/
  utils: {
    count: () => fetchGraphQL<any>(`query { countProductosInstitucion }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsProductoInstitucion(id: $id) }`, { id })
  }
};