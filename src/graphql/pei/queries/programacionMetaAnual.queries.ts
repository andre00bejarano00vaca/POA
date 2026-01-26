// src/graphql/pei/queries/programacionMetaAnual.queries.ts

export const LIST_PROGRAMACIONES_METAS_ANUALES = `
  query ListProgramacionesMetasAnuales {
    listProgramacionesMetasAnuales {
      count
      results {
        id
        anio
        programado
        peiIdPei {
          id
          anioIni
          anioFin
          ejecucion
          metaTotal
          observacion
        }
        idIndicadorPeiImp {
          id
          description
          formula
          lineaBase
          meta
          unidadMedida
          objetivoEstrategico {
            id
            description
            idOe
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
      }
    }
  }
`;

export const GET_PROGRAMACION_META_ANUAL = `
  query GetProgramacionMetaAnual($id: Int!) {
    getProgramacionMetaAnual(id: $id) {
      success
      message
      data {
        id
        anio
        programado
        peiIdPei {
          id
          anioIni
          anioFin
          ejecucion
          metaTotal
          observacion
        }
        idIndicadorPeiImp {
          id
          description
          formula
          lineaBase
          meta
          unidadMedida
          objetivoEstrategico {
            id
            description
            idOe
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
      }
    }
  }
`;
