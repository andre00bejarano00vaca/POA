import { fetchGraphQL } from '@/lib/graphql-client';

export const PoaService = {
  // --- MUTATIONS ---

  /** Crea un nuevo registro de POA */
  create: async (anio: number, fechaRegistro: string, unidadEjecutoraId: number) => {
    const mutation = `
      mutation CreatePoa($anio: Int!, $fecha: String!, $ueId: Int!) {
        createPoa(anio: $anio, fechaRegistro: $fecha, unidadEjecutoraId: $ueId) {
          success
          message
          data {
            id
            anio
            fechaRegistro
            unidadEjecutora { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { anio, fecha: fechaRegistro, ueId: unidadEjecutoraId });
  },

  /** Actualiza la fecha de registro de un POA */
  update: async (id: number, fechaRegistro: string) => {
    const mutation = `
      mutation UpdatePoa($id: ID!, $fecha: String!) {
        updatePoa(id: $id, fechaRegistro: $fecha) {
          success
          message
          data {
            id
            anio
            fechaRegistro
            unidadEjecutora { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, fecha: fechaRegistro });
  },

  /** Elimina un POA por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeletePoa($id: ID!) {
        deletePoa(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene un POA por su ID con el detalle de la Unidad Ejecutora */
  getById: async (id: number) => {
    const query = `
      query GetPoa($id: ID!) {
        getPoa(id: $id) {
          success
          message
          data {
            id
            anio
            fechaRegistro
            unidadEjecutora { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista POAs con soporte para paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListPoas($limit: Int, $offset: Int) {
        listPoas(limit: $limit, offset: $offset) {
          count
          results {
            id
            anio
            fechaRegistro
            unidadEjecutora { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Filtra POAs por un año específico */
  filterByAnio: async (anio: number, limit = 100) => {
    const query = `
      query FilterByAnio($anio: Int!, $limit: Int) {
        filterPoasPorAnio(anio: $anio, limit: $limit) {
          count
          results {
            id
            anio
            fechaRegistro
            unidadEjecutora { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { anio, limit });
  },

  /** Filtra por año y Unidad Ejecutora (Búsqueda combinada) */
  filterByAnioAndUnit: async (anio: number, unitId: number, limit = 100) => {
    const query = `
      query FilterByAnioUnit($anio: Int!, $unitId: Int!, $limit: Int) {
        filterPoasPorAnioYUnidad(anio: $anio, unidadEjecutoraId: $unitId, limit: $limit) {
          count
          results {
            id
            anio
            unidadEjecutora { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { anio, unitId, limit });
  },

  /** Obtiene la lista ordenada (ej: "-anio") */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getPoasOrdenados(orderBy: $orderBy, limit: $limit) {
          count
          results {
            id
            anio
            unidadEjecutora { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Utilidades de conteo y validación */
  utils: {
    count: () => fetchGraphQL<any>(`query { countPoas }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsPoa(id: $id) }`, { id })
  }
};