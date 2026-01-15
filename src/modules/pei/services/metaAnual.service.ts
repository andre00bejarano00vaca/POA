import { fetchGraphQL } from "@/shared/lib/graphql-client";

export const MetaAnualService = {
  // --- MUTATIONS ---

  /** Crea una programación de meta para un año específico */
  create: async (variables: {
    anio: number;
    programado: number;
    ejecutado: number;
    indicadorPeiId: number;
    peiId: number;
  }) => {
    const mutation = `
      mutation CreateMetaAnual($anio: Int!, $prog: Float!, $ejec: Float!, $indId: Int!, $peiId: Int!) {
        createProgramacionMetaAnual(
          anio: $anio
          programado: $prog
          ejecutado: $ejec
          idIndicadorPeiImpId: $indId
          peiIdPeiId: $peiId
        ) {
          success
          message
          data {
            id
            anio
            programado
            ejecutado
            idIndicadorPeiImp { id description formula }
            peiIdPei { id anioIni anioFin }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, {
      anio: variables.anio,
      prog: variables.programado,
      ejec: variables.ejecutado,
      indId: variables.indicadorPeiId,
      peiId: variables.peiId,
    });
  },

  /** Actualiza la ejecución de una meta anual */
  update: async (id: number, ejecutado: number) => {
    const mutation = `
      mutation UpdateMetaAnual($id: ID!, $ejec: Float!) {
        updateProgramacionMetaAnual(id: $id, ejecutado: $ejec) {
          success
          message
          data {
            id
            anio
            programado
            ejecutado
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, ejec: ejecutado });
  },

  /** Elimina un registro de meta anual */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteMetaAnual($id: ID!) {
        deleteProgramacionMetaAnual(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene una meta anual con el detalle del indicador y el PEI */
  getById: async (id: number) => {
    const query = `
      query GetMetaAnual($id: ID!) {
        getProgramacionMetaAnual(id: $id) {
          success
          message
          data {
            id
            anio
            programado
            ejecutado
            idIndicadorPeiImp {
              id
              description
              formula
              unidadMedida
            }
            peiIdPei {
              id
              anioIni
              anioFin
              metaTotal
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todas las metas anuales con paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListMetasAnuales($limit: Int, $offset: Int) {
        listProgramacionesMetasAnuales(limit: $limit, offset: $offset) {
          count
          results {
            id
            anio
            programado
            ejecutado
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Filtra las metas por un año específico */
  filterByAnio: async (anio: number, limit = 100) => {
    const query = `
      query FilterByAnio($anio: Int!, $limit: Int) {
        filterMetasPorAnio(anio: $anio, limit: $limit) {
          count
          results {
            id
            anio
            programado
            ejecutado
            idIndicadorPeiImp { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { anio, limit });
  },

  /** Filtra las metas que pertenecen a un indicador específico */
  filterByIndicador: async (indicadorId: number, limit = 100) => {
    const query = `
      query FilterByInd($indId: Int!, $limit: Int) {
        filterMetasPorIndicador(idIndicadorPeiImpId: $indId, limit: $limit) {
          count
          results {
            id
            anio
            programado
            ejecutado
          }
        }
      }`;
    return fetchGraphQL<any>(query, { indId: indicadorId, limit });
  },
};
