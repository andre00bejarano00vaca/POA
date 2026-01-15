import { fetchGraphQL } from "@/shared/lib/graphql-client";

export const ActividadService = {
  // --- MUTATIONS ---

  /** Crea una nueva actividad operativa */
  create: async (variables: {
    categProgramatica: string;
    description: string;
    tipo: string;
    clase: string;
    fechaIni: string;
    fechaFinal: string;
    docVerif: number;
    accionCortoPlazoId: number;
    causasDesv?: string;
  }) => {
    const mutation = `
      mutation CreateActividad($categProgramatica: String!, $description: String!, $tipo: String!, $clase: String!, $fechaIni: String!, $fechaFinal: String!, $docVerif: Int!, $accionCortoPlazoId: Int!, $causasDesv: String) {
        createActividad(
          categProgramatica: $categProgramatica
          description: $description
          tipo: $tipo
          clase: $clase
          fechaIni: $fechaIni
          fechaFinal: $fechaFinal
          docVerif: $docVerif
          accionCortoPlazoId: $accionCortoPlazoId
          causasDesv: $causasDesv
        ) {
          success
          message
          data {
            id
            description
            tipo
            fechaIni
            fechaFinal
            accionCortoPlazo { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, variables);
  },

  /** Actualiza la descripción o documentos de verificación de una actividad */
  update: async (id: number, description: string, docVerif: number) => {
    const mutation = `
      mutation UpdateActividad($id: ID!, $description: String!, $docVerif: Int!) {
        updateActividad(id: $id, description: $description, docVerif: $docVerif) {
          success
          message
          data { id description docVerif }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, description, docVerif });
  },

  /** Elimina una actividad por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteActividad($id: ID!) {
        deleteActividad(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene el detalle completo de una actividad y su jerarquía */
  getById: async (id: number) => {
    const query = `
      query GetActividad($id: ID!) {
        getActividad(id: $id) {
          success
          message
          data {
            id
            categProgramatica
            description
            tipo
            clase
            fechaIni
            fechaFinal
            docVerif
            causasDesv
            accionCortoPlazo {
              id
              description
              programa { id description }
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista actividades con soporte para paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListActividades($limit: Int, $offset: Int) {
        listActividades(limit: $limit, offset: $offset) {
          count
          results { id description tipo fechaIni fechaFinal }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca actividades por descripción (ej: "capacitación") */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchActividades($search: String!, $limit: Int) {
        searchActividades(search: $search, limit: $limit) {
          count
          results { id description tipo }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Filtra actividades por una acción de corto plazo específica */
  filterByAccion: async (accionId: number, limit = 100) => {
    const query = `
      query FilterByAccion($accionId: Int!, $limit: Int) {
        filterActividadesPorAccion(accionCortoPlazoId: $accionId, limit: $limit) {
          count
          results { id description tipo fechaIni }
        }
      }`;
    return fetchGraphQL<any>(query, { accionId, limit });
  },

  /** Obtiene la lista ordenada (ej: "-fecha_ini") */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getActividadesOrdenadas(orderBy: $orderBy, limit: $limit) {
          count
          results { id description fechaIni }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Utilidades de conteo y validación */
  utils: {
    count: () => fetchGraphQL<any>(`query { countActividades }`),
    exists: (id: number) =>
      fetchGraphQL<any>(`query Exists($id: ID!) { existsActividad(id: $id) }`, {
        id,
      }),
  },
};
