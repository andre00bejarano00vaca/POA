// src/graphql/planificacion/mutations/programacionMetaAnual.mutations.ts

export const CREATE_PROGRAMACION_META_ANUAL = `
  mutation CreateProgramacionMetaAnual(
    $anio: Int!
    $ejecutado: Int!
    $idIndicadorPeiImpId: Int!
    $peiIdPeiId: Int!
    $programado: Int!
  ) {
    createProgramacionMetaAnual(
      anio: $anio
      ejecutado: $ejecutado
      idIndicadorPeiImpId: $idIndicadorPeiImpId
      peiIdPeiId: $peiIdPeiId
      programado: $programado
    ) {
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
          lineaBase
          meta
          unidadMedida
          objetivoEstrategico {
            id
            idOe
            description
            politicaDesarrollo {
              id
              idPd
              description
              areaEstrategica {
                id
                description
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
        peiIdPei {
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
`;

export const UPDATE_PROGRAMACION_META_ANUAL = `
  mutation UpdateProgramacionMetaAnual(
    $id: Int!
    $anio: Int
    $ejecutado: Int
    $idIndicadorPeiImpId: Int
    $peiIdPeiId: Int
    $programado: Int
  ) {
    updateProgramacionMetaAnual(
      id: $id
      anio: $anio
      ejecutado: $ejecutado
      idIndicadorPeiImpId: $idIndicadorPeiImpId
      peiIdPeiId: $peiIdPeiId
      programado: $programado
    ) {
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
          lineaBase
          meta
          unidadMedida
          objetivoEstrategico {
            id
            idOe
            description
            politicaDesarrollo {
              id
              idPd
              description
              areaEstrategica {
                id
                description
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
        peiIdPei {
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
`;

export const DELETE_PROGRAMACION_META_ANUAL = `
  mutation DeleteProgramacionMetaAnual($id: Int!) {
    deleteProgramacionMetaAnual(id: $id) {
      success
      message
      data
    }
  }
`;
