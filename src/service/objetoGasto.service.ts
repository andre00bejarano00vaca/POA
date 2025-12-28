import { fetchGraphQL } from '@/lib/graphql-client';

export const ObjetoGastoService = {
  // --- MUTATIONS ---

  /** Crea un nuevo Objeto de Gasto vinculado a financiamiento */
  create: async (variables: {
    description: string;
    importeDouble: number;
    entidadTransferenciaId: number;
    organismoId: number;
  }) => {
    const mutation = `
      mutation CreateObjetoGasto($desc: String!, $imp: Float!, $etId: Int!, $orgId: Int!) {
        createObjetoGasto(
          description: $desc
          importeDouble: $imp
          entidadTransferenciaIdEtId: $etId
          organismoIdOrgId: $orgId
        ) {
          success
          message
          data {
            id
            description
            importeDouble
            entidadTransferenciaIdEt { id description }
            organismoIdOrg { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, {
      desc: variables.description,
      imp: variables.importeDouble,
      etId: variables.entidadTransferenciaId,
      orgId: variables.organismoId
    });
  },

  /** Actualiza la descripción o el importe del gasto */
  update: async (id: number, description: string, importeDouble: number) => {
    const mutation = `
      mutation UpdateObjetoGasto($id: ID!, $desc: String!, $imp: Float!) {
        updateObjetoGasto(id: $id, description: $desc, importeDouble: $imp) {
          success
          message
          data {
            id
            description
            importeDouble
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, desc: description, imp: importeDouble });
  },

  /** Elimina un objeto de gasto */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteObjetoGasto($id: ID!) {
        deleteObjetoGasto(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene un Objeto de Gasto con todo su detalle de origen de fondos */
  getById: async (id: number) => {
    const query = `
      query GetObjetoGasto($id: ID!) {
        getObjetoGasto(id: $id) {
          success
          message
          data {
            id
            description
            importeDouble
            entidadTransferenciaIdEt {
              id
              codigo
              description
            }
            organismoIdOrg {
              id
              codigo
              description
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todos los objetos de gasto con paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListObjetoGastos($limit: Int, $offset: Int) {
        listObjetoGastos(limit: $limit, offset: $offset) {
          count
          results {
            id
            description
            importeDouble
            organismoIdOrg { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca objetos de gasto por descripción (ej: "PAPEL") */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchObjetoGastos($search: String!, $limit: Int) {
        searchObjetoGastos(search: $search, limit: $limit) {
          count
          results {
            id
            description
            importeDouble
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Filtra por Organismo financiador específico */
  filterByOrganismo: async (organismoId: number, limit = 100) => {
    const query = `
      query FilterByOrg($orgId: Int!, $limit: Int) {
        filterObjetoGastoPorOrganismo(organismoId: $orgId, limit: $limit) {
          count
          results {
            id
            description
            importeDouble
          }
        }
      }`;
    return fetchGraphQL<any>(query, { orgId: organismoId, limit });
  },

  /** Utilidades de conteo y validación */
  utils: {
    count: () => fetchGraphQL<any>(`query { countObjetoGastos }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsObjetoGasto(id: $id) }`, { id })
  }
};