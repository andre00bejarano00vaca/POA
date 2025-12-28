import { fetchGraphQL } from '@/lib/graphql-client';

export const PresupuestoDetalleService = {
  // --- MUTATIONS ---

  /** Crea un nuevo detalle de presupuesto vinculando actividad y objeto de gasto */
  create: async (importe: number, presupuestoId: number, actividadId: number, objetoGastoId: number) => {
    const mutation = `
      mutation CreatePresupuestoDetalle($importe: Float!, $presId: Int!, $actId: Int!, $ogId: Int!) {
        createPresupuestoDetalle(
          importeDouble: $importe
          presupuestoIdPresId: $presId
          actividadIdActId: $actId
          objetoGastoIdOgId: $ogId
        ) {
          success
          message
          data {
            id
            importeDouble
            presupuestoIdPres { id anio }
            actividadIdAct { id description }
            objetoGastoIdOg { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { importe, presId: presupuestoId, actId: actividadId, ogId: objetoGastoId });
  },

  /** Actualiza el importe de un detalle de presupuesto existente */
  update: async (id: number, importe: number) => {
    const mutation = `
      mutation UpdatePresupuestoDetalle($id: ID!, $importe: Float!) {
        updatePresupuestoDetalle(id: $id, importeDouble: $importe) {
          success
          message
          data {
            id
            importeDouble
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, importe });
  },

  /** Elimina un registro de detalle de presupuesto */
  delete: async (id: number) => {
    const mutation = `
      mutation DeletePresupuestoDetalle($id: ID!) {
        deletePresupuestoDetalle(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene un detalle específico con toda su jerarquía de relaciones */
  getById: async (id: number) => {
    const query = `
      query GetPresupuestoDetalle($id: ID!) {
        getPresupuestoDetalle(id: $id) {
          success
          message
          data {
            id
            importeDouble
            presupuestoIdPres {
              id
              anio
              totalDouble
            }
            actividadIdAct {
              id
              description
            }
            objetoGastoIdOg {
              id
              description
              importeDouble
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todos los detalles de presupuesto con paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListPresupuestoDetalles($limit: Int, $offset: Int) {
        listPresupuestoDetalles(limit: $limit, offset: $offset) {
          count
          results {
            id
            importeDouble
            presupuestoIdPres { anio }
            actividadIdAct { description }
            objetoGastoIdOg { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Filtra los detalles que pertenecen a una actividad específica */
  filterByActividad: async (actividadId: number, limit = 100) => {
    const query = `
      query FilterByActividad($actId: Int!, $limit: Int) {
        filterPresupuestoDetallePorActividad(actividadId: $actId, limit: $limit) {
          count
          results {
            id
            importeDouble
            objetoGastoIdOg { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { actId: actividadId, limit });
  },

  /** Filtra los detalles vinculados a un presupuesto (año) específico */
  filterByPresupuesto: async (presupuestoId: number, limit = 100) => {
    const query = `
      query FilterByPresupuesto($presId: Int!, $limit: Int) {
        filterPresupuestoDetallePorPresupuesto(presupuestoId: $presId, limit: $limit) {
          count
          results {
            id
            importeDouble
            actividadIdAct { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { presId: presupuestoId, limit });
  },

  /** Utilidades de conteo y validación */
  utils: {
    count: () => fetchGraphQL<any>(`query { countPresupuestoDetalles }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsPresupuestoDetalle(id: $id) }`, { id })
  }
};