// src/graphql/seguimiento/mutations/seguimientoPeiObjetivo.mutations.ts

export const CREATE_SEGUIMIENTO_PEI_OBJETIVO = `
  mutation CreateSeguimientoPeiObjetivo(
    $escalaValoracion: String!,
    $objetivoEstrategicoId: Int!,
    $promedioCumplimiento: Float!,
    $seguimientoPeiId: Int!,
    $valoracionCualitativa: String
  ) {
    createSeguimientoPeiObjetivo(
      escalaValoracion: $escalaValoracion,
      objetivoEstrategicoId: $objetivoEstrategicoId,
      promedioCumplimiento: $promedioCumplimiento,
      seguimientoPeiId: $seguimientoPeiId,
      valoracionCualitativa: $valoracionCualitativa
    ) {
      success
      message
      data {
        id
        escalaValoracion
        promedioCumplimiento
        valoracionCualitativa
        objetivoEstrategico {
          id
          description
          idOe
          politicaDesarrollo {
            id
            description
            idPd
            areaEstrategica {
              id
              description
              pei {
                id
                observacion
                metaTotal
                ejecucion
                anioIni
                anioFin
              }
            }
          }
        }
        seguimientoPei {
          id
          anio
          fechaRegistro
          observaciones
          porcBaja
          porcAlta
          porcMedia
          promediaGeneral
          valoracionGlobal
          pei {
            id
            anioIni
            anioFin
            ejecucion
            metaTotal
            observacion
          }
        }
      }
    }
  }
`;

export const UPDATE_SEGUIMIENTO_PEI_OBJETIVO = `
  mutation UpdateSeguimientoPeiObjetivo(
    $id: Int!,
    $escalaValoracion: String,
    $objetivoEstrategicoId: Int,
    $promedioCumplimiento: Float,
    $seguimientoPeiId: Int,
    $valoracionCualitativa: String
  ) {
    updateSeguimientoPeiObjetivo(
      id: $id,
      escalaValoracion: $escalaValoracion,
      objetivoEstrategicoId: $objetivoEstrategicoId,
      promedioCumplimiento: $promedioCumplimiento,
      seguimientoPeiId: $seguimientoPeiId,
      valoracionCualitativa: $valoracionCualitativa
    ) {
      success
      message
      data {
        id
        escalaValoracion
        promedioCumplimiento
        valoracionCualitativa
        seguimientoPei {
          id
          fechaRegistro
          anio
          observaciones
          porcAlta
          porcBaja
          porcMedia
          promediaGeneral
          valoracionGlobal
          pei {
            id
            anioFin
            anioIni
            ejecucion
            metaTotal
            observacion
          }
        }
        objetivoEstrategico {
          id
          description
          idOe
          politicaDesarrollo {
            id
            description
            idPd
            areaEstrategica {
              id
              description
              pei {
                id
                anioIni
                anioFin
                observacion
                metaTotal
                ejecucion
              }
            }
          }
        }
      }
    }
  }
`;

export const DELETE_SEGUIMIENTO_PEI_OBJETIVO = `
  mutation DeleteSeguimientoPeiObjetivo($id: Int!) {
    deleteSeguimientoPeiObjetivo(id: $id) {
      success
      message
      data
    }
  }
`;
