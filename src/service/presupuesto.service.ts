import { fetchGraphQL } from '@/lib/graphql-client';

export const PresupuestoService = {
  // --- MUTATIONS ---

  /** Crea un nuevo presupuesto anual para una unidad ejecutora */
  create: async (anio: number, fechaRealizado: string, total: number, unidadEjecutoraId: number) => {
    const mutation = `
      mutation CreatePresupuesto($anio: Int!, $fecha: String!, $total: Float!, $ueId: Int!) {
        createPresupuesto(
          anio: $anio
          fechaRealizdo: $fecha
          totalDouble: $total
          unidadEjecutoraIdUeId: $ueId
        ) {
          success
          message
          data {
            id
            anio
            totalDouble
            unidadEjecutoraIdUe { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { anio, fecha: fechaRealizado, total, ueId: unidadEjecutoraId });
  },

  /** Actualiza el monto total de un presupuesto */
  update: async (id: number, total: number) => {
    const mutation = `
      mutation UpdatePresupuesto($id: ID!, $total: Float!) {
        updatePresupuesto(id: $id, totalDouble: $total) {
          success
          message
          data {
            id
            anio
            totalDouble
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, total });
  },

  /** Elimina un registro de presupuesto */
  delete: async (id: number) => {
    const mutation = `
      mutation DeletePresupuesto($id: ID!) {
        deletePresupuesto(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene un presupuesto por su ID con información de la unidad ejecutora */
  getById: async (id: number) => {
    const query = `
      query GetPresupuesto($id: ID!) {
        getPresupuesto(id: $id) {
          success
          message
          data {
            id
            anio
            fechaRealizdo
            totalDouble
            unidadEjecutoraIdUe {
              id
              description
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todos los presupuestos registrados */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListPresupuestos($limit: Int, $offset: Int) {
        listPresupuestos(limit: $limit, offset: $offset) {
          count
          results {
            id
            anio
            totalDouble
            unidadEjecutoraIdUe { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Filtra presupuestos por un año específico */
  filterByAnio: async (anio: number, limit = 100) => {
    const query = `
      query FilterByAnio($anio: Int!, $limit: Int) {
        filterPresupuestosPorAnio(anio: $anio, limit: $limit) {
          count
          results {
            id
            anio
            totalDouble
            unidadEjecutoraIdUe { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { anio, limit });
  },

  /** Utilidades de conteo y existencia */
  utils: {
    count: () => fetchGraphQL<any>(`query { countPresupuestos }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsPresupuesto(id: $id) }`, { id })
  }
};