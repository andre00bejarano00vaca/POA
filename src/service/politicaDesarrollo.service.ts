import { fetchGraphQL } from '@/lib/graphql-client';

export const PoliticaDesarrolloService = {
  // --- MUTATIONS ---

  /** Crea una nueva política de desarrollo vinculada a un área estratégica */
  create: async (idPd: number, description: string, areaEstrategicaId: number) => {
    const mutation = `
      mutation CreatePolitica($idPd: Int!, $description: String!, $areaId: Int!) {
        createPoliticaDesarrollo(
          idPd: $idPd
          description: $description
          areaEstrategicaId: $areaId
        ) {
          success
          message
          data {
            id
            idPd
            description
            areaEstrategica { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { idPd, description, areaId: areaEstrategicaId });
  },

  /** Actualiza la descripción de una política de desarrollo existente */
  update: async (id: number, description: string) => {
    const mutation = `
      mutation UpdatePolitica($id: ID!, $description: String!) {
        updatePoliticaDesarrollo(id: $id, description: $description) {
          success
          message
          data {
            id
            idPd
            description
            areaEstrategica { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, description });
  },

  /** Elimina una política de desarrollo por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeletePolitica($id: ID!) {
        deletePoliticaDesarrollo(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene una política de desarrollo por su ID */
  getById: async (id: number) => {
    const query = `
      query GetPolitica($id: ID!) {
        getPoliticaDesarrollo(id: $id) {
          success
          message
          data {
            id
            idPd
            description
            areaEstrategica { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todas las políticas de desarrollo con paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListPoliticas($limit: Int, $offset: Int) {
        listPoliticasDesarrollo(limit: $limit, offset: $offset) {
          count
          results {
            id
            idPd
            description
            areaEstrategica { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca políticas de desarrollo por descripción */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchPoliticas($search: String!, $limit: Int) {
        searchPoliticasDesarrollo(search: $search, limit: $limit) {
          count
          results {
            id
            idPd
            description
            areaEstrategica { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Filtra políticas por un área estratégica específica */
  filterByArea: async (areaEstrategicaId: number, limit = 100) => {
    const query = `
      query FilterByArea($areaId: Int!, $limit: Int) {
        filterPoliticasPorArea(areaEstrategicaId: $areaId, limit: $limit) {
          count
          results {
            id
            idPd
            description
            areaEstrategica { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { areaId: areaEstrategicaId, limit });
  },

  /** Obtiene una política filtrando por su código idPd único */
  filterByIdPd: async (idPd: number) => {
    const query = `
      query FilterByIdPd($idPd: Int!) {
        filterPoliticasPorIdPd(idPd: $idPd) {
          success
          message
          data {
            id
            idPd
            description
            areaEstrategica { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { idPd });
  },

  /** Obtiene la lista ordenada (ej: "-id", "id_pd", "description") */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getPoliticasDesarrolloOrdenadas(orderBy: $orderBy, limit: $limit) {
          count
          results {
            id
            idPd
            description
            areaEstrategica { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Utilidades para conteo y verificación de existencia */
  utils: {
    count: () => fetchGraphQL<any>(`query { countPoliticasDesarrollo }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsPoliticaDesarrollo(id: $id) }`, { id })
  }
};