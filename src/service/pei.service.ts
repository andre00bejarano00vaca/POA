import { fetchGraphQL } from '@/lib/graphql-client';

export const PeiService = {
  // --- MUTATIONS ---

  /** Crea un nuevo plan PEI definiendo su periodo y meta total */
  create: async (anioIni: string, anioFin: string, metaTotal: number) => {
    const mutation = `
      mutation CreatePei($anioIni: String!, $anioFin: String!, $metaTotal: Float!) {
        createPei(anioIni: $anioIni, anioFin: $anioFin, metaTotal: $metaTotal) {
          success
          message
          data {
            id
            anioIni
            anioFin
            metaTotal
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { anioIni, anioFin, metaTotal });
  },

  /** Actualiza la ejecución y observaciones de un PEI existente */
  update: async (id: number, ejecucion: number, observacion: string) => {
    const mutation = `
      mutation UpdatePei($id: ID!, $ejecucion: Float!, $observacion: String!) {
        updatePei(id: $id, ejecucion: $ejecucion, observacion: $observacion) {
          success
          message
          data {
            id
            anioIni
            anioFin
            ejecucion
            observacion
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, ejecucion, observacion });
  },

  /** Elimina un registro de PEI por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeletePei($id: ID!) {
        deletePei(id: $id)
      }`;
    // Nota: Esta mutación devuelve directamente el resultado según el esquema proporcionado
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene la lista de todos los planes PEI registrados */
  listAll: async () => {
    const query = `
      query AllPei {
        allPei {
          id
          anioIni
          anioFin
          metaTotal
          ejecucion
          observacion
        }
      }`;
    return fetchGraphQL<any>(query);
  },

  /** Obtiene el detalle de un PEI específico por su ID */
  getById: async (id: number) => {
    const query = `
      query PeiById($id: ID!) {
        peiById(id: $id) {
          id
          anioIni
          anioFin
          metaTotal
          ejecucion
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Filtra planes PEI por su fecha de inicio */
  filterByAnioIni: async (anioIni: string) => {
    const query = `
      query PeiFilter($anioIni: String!) {
        peiFilter(anioIni: $anioIni) {
          id
          anioFin
          metaTotal
        }
      }`;
    return fetchGraphQL<any>(query, { anioIni });
  }
};