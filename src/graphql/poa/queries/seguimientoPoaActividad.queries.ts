// src/graphql/poa/queries/seguimientoPoaActividad.queries.ts

export const LIST_SEGUIMIENTOS_POA_ACTIVIDAD = `
  query ListSeguimientosPoaActividad($offset: Int, $limit: Int) {
    listSeguimientosPoaActividad(offset: $offset, limit: $limit) {
      count
      results {
        escalaValoracion
        id
        valoracionCualitativa
        promedioCumplimiento
        actividad {
          causasDesv
          id
          tipo
          fechaIni
          fechaFinal
          docVerif
          description
          clase
          categProgramatica
          accionCortoPlazo {
            id
            description
            programa {
              description
              id
              poa {
                anio
                fechaRegistro
                id
                unidadEjecutora {
                  techoPres
                  id
                  direccionAdministrativa {
                    description
                    id
                  }
                  description
                }
              }
            }
          }
        }
        seguimientoPoa {
          fechaRegistro
          id
          observaciones
          poa {
            fechaRegistro
            anio
            id
            unidadEjecutora {
              description
              id
              techoPres
              direccionAdministrativa {
                description
                id
                entidad {
                  activo
                  sigla
                  id
                  codigo
                }
              }
            }
          }
          porcAlta
          porcBaja
          porcMedia
          promedioGeneral
          trimestre
          valoracionGlobal
        }
      }
    }
  }
`;

export const GET_SEGUIMIENTO_POA_ACTIVIDAD = `
  query GetSeguimientoPoaActividad($id: Int!) {
    getSeguimientoPoaActividad(id: $id) {
      data {
        escalaValoracion
        valoracionCualitativa
        seguimientoPoa {
          id
          fechaRegistro
          porcBaja
          poa {
            anio
            fechaRegistro
            unidadEjecutora {
              description
              id
              techoPres
              direccionAdministrativa {
                description
                id
                entidad {
                  activo
                  codigo
                  sigla
                  id
                }
              }
            }
            id
          }
          observaciones
          valoracionGlobal
          porcMedia
          promedioGeneral
          trimestre
          porcAlta
        }
        id
        promedioCumplimiento
        actividad {
          causasDesv
          categProgramatica
          clase
          description
          docVerif
          fechaFinal
          fechaIni
          id
          tipo
          accionCortoPlazo {
            description
            programa {
              id
              description
              poa {
                anio
                id
                unidadEjecutora {
                  description
                  id
                  techoPres
                  direccionAdministrativa {
                    description
                    id
                    entidad {
                      activo
                      codigo
                      id
                      sigla
                    }
                  }
                }
                fechaRegistro
              }
            }
            id
          }
        }
      }
      message
      success
    }
  }
`;
