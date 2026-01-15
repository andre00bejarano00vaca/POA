import { fetchGraphQL } from "@/shared/lib/graphql-client";

export const MatrizPeiService = {
  // --- MUTATIONS ---

  /** Crea un nuevo registro en la Matriz PEI */
  create: async (variables: {
    peiId: number;
    objetivoEstrategicoId: number;
    accionEstrategicaId: number;
    indicadorPeiId: number;
    unidadEjecutoraId: number;
    productoInstitucionalId: number;
    anioBase: number;
    metaMedianoPlazo: number;
  }) => {
    const mutation = `
      mutation CreateMatrizPei($peiId: Int!, $objetivoEstrategicoId: Int!, $accionEstrategicaId: Int!, $indicadorPeiId: Int!, $unidadEjecutoraId: Int!, $productoInstitucionalId: Int!, $anioBase: Int!, $metaMedianoPlazo: Float!) {
        createMatrizPei(
          peiId: $peiId
          objetivoEstrategicoId: $objetivoEstrategicoId
          accionEstrategicaId: $accionEstrategicaId
          indicadorPeiId: $indicadorPeiId
          unidadEjecutoraId: $unidadEjecutoraId
          productoInstitucionalId: $productoInstitucionalId
          anioBase: $anioBase
          metaMedianoPlazo: $metaMedianoPlazo
        ) {
          success
          message
          data {
            id anioBase metaMedianoPlazo
            pei { id anioIni anioFin }
            objetivoEstrategico { id description }
            accionEstrategica { id description }
            indicadorPei { id description }
            unidadEjecutora { id description }
            productoInstitucional { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, variables);
  },

  /** Actualiza la meta de mediano plazo de un registro */
  update: async (id: number, metaMedianoPlazo: number) => {
    const mutation = `
      mutation UpdateMatrizPei($id: ID!, $metaMedianoPlazo: Float!) {
        updateMatrizPei(id: $id, metaMedianoPlazo: $metaMedianoPlazo) {
          success
          message
          data { id anioBase metaMedianoPlazo }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, metaMedianoPlazo });
  },

  /** Elimina un registro de la Matriz PEI */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteMatrizPei($id: ID!) {
        deleteMatrizPei(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene el detalle completo de un registro por ID */
  getById: async (id: number) => {
    const query = `
      query GetMatrizPei($id: ID!) {
        getMatrizPei(id: $id) {
          success
          message
          data {
            id anioBase metaMedianoPlazo
            pei { id anioIni anioFin metaTotal }
            objetivoEstrategico { id idOe description }
            accionEstrategica { id description }
            indicadorPei { id description formula unidadMedida }
            unidadEjecutora { id description }
            productoInstitucional { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todos los registros con paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListMatricesPei($limit: Int, $offset: Int) {
        listMatricesPei(limit: $limit, offset: $offset) {
          count
          results { id anioBase metaMedianoPlazo }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Filtros especializados */
  filterByPei: async (peiId: number, limit = 100) => {
    const query = `
      query FilterByPei($peiId: Int!, $limit: Int) {
        filterMatricesPorPei(peiId: $peiId, limit: $limit) {
          count
          results { id anioBase metaMedianoPlazo pei { id anioIni } }
        }
      }`;
    return fetchGraphQL<any>(query, { peiId, limit });
  },

  filterByUnidadEjecutora: async (unidadEjecutoraId: number, limit = 100) => {
    const query = `
      query FilterByUnidad($unidadEjecutoraId: Int!, $limit: Int) {
        filterMatricesPorUnidadEjecutora(unidadEjecutoraId: $unidadEjecutoraId, limit: $limit) {
          count
          results { id anioBase metaMedianoPlazo unidadEjecutora { id description } }
        }
      }`;
    return fetchGraphQL<any>(query, { unidadEjecutoraId, limit });
  },

  /** Obtiene registros ordenados por un campo específico (ej: "-meta_mediano_plazo") */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getMatricesPeiOrdenadas(orderBy: $orderBy, limit: $limit) {
          count
          results { id anioBase metaMedianoPlazo }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },
};
