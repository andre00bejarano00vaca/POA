import { fetchGraphQL } from '@/lib/graphql-client';

export const UnidadEjecutoraService = {
  // --- MUTATIONS ---

  /** Crea una nueva unidad ejecutora con un techo presupuestario inicial */
  create: async (description: string, direccionAdministrativaId: number, techoPres: number) => {
    const mutation = `
      mutation CreateUE($desc: String!, $daId: Int!, $techo: Float!) {
        createUnidadEjecutora(
          description: $desc
          direccionAdministrativaId: $daId
          techoPres: $techo
        ) {
          success
          message
          data {
            id
            description
            techoPres
            direccionAdministrativa { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { desc: description, daId: direccionAdministrativaId, techo: techoPres });
  },

  /** Actualiza la descripción o el presupuesto asignado a la unidad */
  update: async (id: number, description: string, techoPres: number) => {
    const mutation = `
      mutation UpdateUE($id: ID!, $desc: String!, $techo: Float!) {
        updateUnidadEjecutora(id: $id, description: $desc, techoPres: $techo) {
          success
          message
          data {
            id
            description
            techoPres
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, desc: description, techo: techoPres });
  },

  /** Elimina una unidad ejecutora */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteUE($id: ID!) {
        deleteUnidadEjecutora(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene una unidad por ID con su dependencia administrativa */
  getById: async (id: number) => {
    const query = `
      query GetUE($id: ID!) {
        getUnidadEjecutora(id: $id) {
          success
          message
          data {
            id
            description
            techoPres
            direccionAdministrativa {
              id
              description
              entidad { sigla }
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todas las unidades ejecutoras */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListUEs($limit: Int, $offset: Int) {
        listUnidadesEjecutoras(limit: $limit, offset: $offset) {
          count
          results {
            id
            description
            techoPres
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Filtra unidades que pertenecen a una Dirección Administrativa específica */
  filterByDireccion: async (daId: number, limit = 100) => {
    const query = `
      query FilterUEByDA($daId: Int!, $limit: Int) {
        filterUnidadesEjecutoras(direccionAdministrativaId: $daId, limit: $limit) {
          count
          results {
            id
            description
            techoPres
          }
        }
      }`;
    return fetchGraphQL<any>(query, { daId, limit });
  },

  /** Obtiene unidades ordenadas (ej: por techo presupuestario o descripción) */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetUEOrdered($orderBy: String, $limit: Int) {
        getUnidadesEjecutorasOrdenadas(orderBy: $orderBy, limit: $limit) {
          count
          results {
            id
            description
            techoPres
          }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  }
};