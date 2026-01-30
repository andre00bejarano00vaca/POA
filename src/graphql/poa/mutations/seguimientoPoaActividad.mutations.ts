// src/graphql/poa/mutations/seguimientoPoaActividad.mutations.ts

export const DELETE_SEGUIMIENTO_POA_ACTIVIDAD = `
  mutation DeleteSeguimientoPoaActividad($id: Int!) {
    deleteSeguimientoPoaActividad(id: $id) {
      success
      message
      data
    }
  }
`;
