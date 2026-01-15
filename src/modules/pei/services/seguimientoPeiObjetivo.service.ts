import { fetchGraphQL } from "@/shared/lib/graphql-client";

export const SeguimientoPeiObjetivoService = {
  // --- MUTATIONS ---

  /** Crea un nuevo registro de seguimiento para un objetivo estratégico */
  create: async (variables: {
    promedioCumplimiento: number;
    escalaValoracion: string;
    valoracionCualitativa: string;
    seguimientoPeiId: number;
    objetivoEstrategicoId: number;
  }) => {
    const mutation = `
      mutation CreateSeguimientoObj($promedio: Float!, $escala: String!, $qual: String!, $segId: Int!, $objId: Int!) {
        createSeguimientoPeiObjetivo(
          promedioCumplimiento: $promedio
          escalaValoracion: $escala
          valoracionCualitativa: $qual
          seguimientoPeiId: $segId
          objetivoEstrategicoId: $objId
        ) {
          success
          message
          data {
            id
            promedioCumplimiento
            escalaValoracion
            objetivoEstrategico { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, {
      promedio: variables.promedioCumplimiento,
      escala: variables.escalaValoracion,
      qual: variables.valoracionCualitativa,
      segId: variables.seguimientoPeiId,
      objId: variables.objetivoEstrategicoId,
    });
  },

  /** Actualiza el cumplimiento y la valoración cualitativa */
  update: async (
    id: number,
    promedio: number,
    valoracionCualitativa: string
  ) => {
    const mutation = `
      mutation UpdateSeguimientoObj($id: ID!, $promedio: Float!, $qual: String!) {
        updateSeguimientoPeiObjetivo(
          id: $id
          promedioCumplimiento: $promedio
          valoracionCualitativa: $qual
        ) {
          success
          message
          data {
            id
            promedioCumplimiento
            valoracionCualitativa
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, {
      id,
      promedio,
      qual: valoracionCualitativa,
    });
  },

  /** Elimina un registro de seguimiento */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteSeguimientoObj($id: ID!) {
        deleteSeguimientoPeiObjetivo(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene el detalle de un seguimiento específico con sus relaciones */
  getById: async (id: number) => {
    const query = `
      query GetSeguimientoObj($id: ID!) {
        getSeguimientoPeiObjetivo(id: $id) {
          success
          message
          data {
            id
            promedioCumplimiento
            escalaValoracion
            valoracionCualitativa
            seguimientoPei { id anio }
            objetivoEstrategico { id description idOe }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todos los seguimientos de objetivos con paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListSeguimientosObj($limit: Int, $offset: Int) {
        listSeguimientosPeiObjetivos(limit: $limit, offset: $offset) {
          count
          results {
            id
            promedioCumplimiento
            escalaValoracion
            valoracionCualitativa
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Filtra los resultados por un Seguimiento PEI (Cabecera) */
  filterBySeguimientoPei: async (seguimientoPeiId: number, limit = 100) => {
    const query = `
      query FilterBySegPei($segId: Int!, $limit: Int) {
        filterSeguimientosPorSeguimientoPei(seguimientoPeiId: $segId, limit: $limit) {
          count
          results {
            id
            promedioCumplimiento
            escalaValoracion
            seguimientoPei { anio }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { segId: seguimientoPeiId, limit });
  },

  /** Filtra los resultados por un Objetivo Estratégico específico */
  filterByObjetivo: async (objetivoId: number, limit = 100) => {
    const query = `
      query FilterByObj($objId: Int!, $limit: Int) {
        filterSeguimientosPorObjetivo(objetivoEstrategicoId: $objId, limit: $limit) {
          count
          results {
            id
            promedioCumplimiento
            objetivoEstrategico { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { objId: objetivoId, limit });
  },

  /** Filtra por escala de valoración (ej: "Excelente", "Satisfactorio") */
  filterByEscala: async (escala: string, limit = 100) => {
    const query = `
      query FilterByEscala($escala: String!, $limit: Int) {
        filterSeguimientosPorEscala(escalaValoracion: $escala, limit: $limit) {
          count
          results {
            id
            promedioCumplimiento
            escalaValoracion
          }
        }
      }`;
    return fetchGraphQL<any>(query, { escala, limit });
  },
};
