// src/graphql/pei/mutations/seguimientoPeiIndicador.mutations.ts

// ==========================================
// NUEVA MUTACIÓN: Actualizar Ejecutado (usando método del modelo)
// ==========================================
export const ACTUALIZAR_EJECUTADO_SEGUIMIENTO_INDICADOR = `
  mutation ActualizarEjecutadoSeguimientoIndicador(
    $seguimientoPeiIndicadorId: Int!
    $ejecutado: Int!
    $comentarios: String
  ) {
    actualizarEjecutadoSeguimientoIndicador(
      seguimientoPeiIndicadorId: $seguimientoPeiIndicadorId
      ejecutado: $ejecutado
      comentarios: $comentarios
    ) {
      success
      message
      data {
        id
        comentarios
        ejecutado
        programado
        gradoComplimiento
        escalaValoracion
        metaAnual {
          id
          anio
          programado
          idIndicadorPeiImp {
            id
            description
            unidadMedida
            formula
            lineaBase
            meta
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
                    metaTotal
                    ejecucion
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
            metaTotal
            ejecucion
            observacion
          }
        }
        seguimientoPeiObjetivo {
          id
          promedioCumplimiento
          escalaValoracion
          valoracionCualitativa
          seguimientoPei {
            id
            anio
            promediaGeneral
            valoracionGlobal
            observaciones
            porcAlta
            porcMedia
            porcBaja
            fechaRegistro
            pei {
              id
              anioIni
              anioFin
              metaTotal
              ejecucion
              observacion
            }
          }
        }
      }
    }
  }
`;
