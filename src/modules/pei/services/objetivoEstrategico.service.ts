import { fetchGraphQL } from "@/shared/lib/graphql-client";

export const ObjetivoEstrategicoService = {
  // --- MUTATIONS ---

  /** Crea un nuevo objetivo estratégico AMP vinculado a una política de desarrollo */
  create: async (
    idOe: number,
    description: string,
    politicaDesarrolloId: number
  ) => {
    const mutation = `
      mutation CreateObjetivo($idOe: Int!, $description: String!, $politicaId: Int!) {
        createObjetivoEstrategicoAmp(
          idOe: $idOe
          description: $description
          politicaDesarrolloId: $politicaId
        ) {
          success
          message
          data {
            id
            idOe
            description
            politicaDesarrolloId
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, {
      idOe,
      description,
      politicaId: politicaDesarrolloId,
    });
  },

  /** Actualiza la descripción de un objetivo estratégico existente */
  update: async (id: number, description: string) => {
    const mutation = `
      mutation UpdateObjetivo($id: ID!, $description: String!) {
        updateObjetivoEstrategicoAmp(id: $id, description: $description) {
          success
          message
          data {
            id
            idOe
            description
            politicaDesarrollo { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, description });
  },

  /** Elimina un objetivo estratégico por su ID interno */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteObjetivo($id: ID!) {
        deleteObjetivoEstrategicoAmp(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene un objetivo estratégico por su ID con el detalle de su política */
  getById: async (id: number) => {
    const query = `
      query GetObjetivo($id: ID!) {
        getObjetivoEstrategicoAmp(id: $id) {
          success
          message
          data {
            id
            idOe
            description
            politicaDesarrollo { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista objetivos estratégicos con soporte para paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListObjetivos($limit: Int, $offset: Int) {
        listObjetivosEstrategicosAmp(limit: $limit, offset: $offset) {
          count
          results {
            id
            idOe
            description
            politicaDesarrollo { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca objetivos por coincidencia de texto en la descripción */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchObjetivos($search: String!, $limit: Int) {
        searchObjetivosEstrategicosAmp(search: $search, limit: $limit) {
          count
          results {
            id
            idOe
            description
            politicaDesarrollo { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Filtra objetivos por una política de desarrollo específica */
  filterByPolitica: async (politicaDesarrolloId: number, limit = 100) => {
    const query = `
      query FilterByPolitica($politicaId: Int!, $limit: Int) {
        filterObjetivosPorPolitica(politicaDesarrolloId: $politicaId, limit: $limit) {
          count
          results {
            id
            idOe
            description
            politicaDesarrollo { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, {
      politicaId: politicaDesarrolloId,
      limit,
    });
  },

  /** Busca un objetivo por su código id_oe único */
  filterByIdOe: async (idOe: number) => {
    const query = `
      query FilterByIdOe($idOe: Int!) {
        filterObjetivoPorIdOe(idOe: $idOe) {
          success
          message
          data {
            id
            idOe
            description
            politicaDesarrollo { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { idOe });
  },

  /** Obtiene la lista ordenada (ej: "-id", "id_oe", "description") */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getObjetivosEstrategicosAmpOrdenados(orderBy: $orderBy, limit: $limit) {
          count
          results {
            id
            idOe
            description
            politicaDesarrollo { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Utilidades para conteo y validación */
  utils: {
    count: () => fetchGraphQL<any>(`query { countObjetivosEstrategicosAmp }`),
    exists: (id: number) =>
      fetchGraphQL<any>(
        `query Exists($id: ID!) { existsObjetivoEstrategicoAmp(id: $id) }`,
        { id }
      ),
  },
};
