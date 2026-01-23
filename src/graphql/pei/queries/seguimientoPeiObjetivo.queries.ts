// // src/graphql/seguimiento/queries/seguimientoPeiObjetivo.queries.ts

// export const LIST_SEGUIMIENTOS_PEI_OBJETIVOS = `
//   query ListSeguimientosPeiObjetivos($limit: Int, $offset: Int) {
//     listSeguimientosPeiObjetivos(limit: $limit, offset: $offset) {
//       count
//       results {
//         id
//         escalaValoracion
//         promedioCumplimiento
//         valoracionCualitativa
//         objetivoEstrategico {
//           id
//           description
//           idOe
//           politicaDesarrollo {
//             id
//             description
//             idPd
//             areaEstrategica {
//               id
//               description
//               pei {
//                 id
//                 anioFin
//                 anioIni
//                 ejecucion
//                 metaTotal
//                 observacion
//               }
//             }
//           }
//         }
//         seguimientoPei {
//           id
//           anio
//           fechaRegistro
//           observaciones
//           porcAlta
//           porcBaja
//           porcMedia
//           promediaGeneral
//           valoracionGlobal
//           pei {
//             id
//             anioFin
//             anioIni
//             ejecucion
//             metaTotal
//             observacion
//           }
//         }
//       }
//     }
//   }
// `;

// export const GET_SEGUIMIENTO_PEI_OBJETIVO = `
//   query GetSeguimientoPeiObjetivo($id: Int!) {
//     getSeguimientoPeiObjetivo(id: $id) {
//       success
//       message
//       data {
//         id
//         escalaValoracion
//         promedioCumplimiento
//         valoracionCualitativa
//         objetivoEstrategico {
//           id
//           description
//           idOe
//           politicaDesarrollo {
//             id
//             description
//             idPd
//             areaEstrategica {
//               id
//               description
//               pei {
//                 id
//                 anioFin
//                 anioIni
//                 ejecucion
//                 metaTotal
//                 observacion
//               }
//             }
//           }
//         }
//         seguimientoPei {
//           id
//           anio
//           fechaRegistro
//           observaciones
//           porcAlta
//           porcBaja
//           porcMedia
//           promediaGeneral
//           valoracionGlobal
//           pei {
//             id
//             anioFin
//             anioIni
//             ejecucion
//             metaTotal
//             observacion
//           }
//         }
//       }
//     }
//   }
// `;

// export const GET_SEGUIMIENTOS_PEI_OBJETIVOS_ORDENADOS = `
//   query GetSeguimientosPeiObjetivosOrdenados($limit: Int, $offset: Int, $orderBy: String!) {
//     getSeguimientosPeiObjetivosOrdenados(limit: $limit, offset: $offset, orderBy: $orderBy) {
//       count
//       results {
//         id
//         escalaValoracion
//         promedioCumplimiento
//         valoracionCualitativa
//         objetivoEstrategico {
//           id
//           description
//           idOe
//           politicaDesarrollo {
//             id
//             description
//             idPd
//             areaEstrategica {
//               id
//               description
//               pei {
//                 id
//                 anioFin
//                 anioIni
//                 ejecucion
//                 metaTotal
//                 observacion
//               }
//             }
//           }
//         }
//         seguimientoPei {
//           id
//           anio
//           fechaRegistro
//           observaciones
//           porcAlta
//           porcBaja
//           porcMedia
//           promediaGeneral
//           valoracionGlobal
//           pei {
//             id
//             anioFin
//             anioIni
//             ejecucion
//             metaTotal
//             observacion
//           }
//         }
//       }
//     }
//   }
// `;

// export const COUNT_SEGUIMIENTOS_PEI_OBJETIVOS = `
//   query CountSeguimientosPeiObjetivos {
//     countSeguimientosPeiObjetivos
//   }
// `;

// export const EXISTS_SEGUIMIENTO_PEI_OBJETIVO = `
//   query ExistsSeguimientoPeiObjetivo($id: Int!) {
//     existsSeguimientoPeiObjetivo(id: $id)
//   }
// `;

// export const FILTER_OBJETIVOS_POR_SEGUIMIENTO = `
//   query FilterObjetivosPorSeguimiento($seguimientoPeiId: Int!, $limit: Int, $offset: Int) {
//     filterObjetivosPorSeguimiento(seguimientoPeiId: $seguimientoPeiId, limit: $limit, offset: $offset) {
//       count
//       results {
//         id
//         escalaValoracion
//         promedioCumplimiento
//         valoracionCualitativa
//         objetivoEstrategico {
//           id
//           description
//           idOe
//         }
//         seguimientoPei {
//           id
//           anio
//           valoracionGlobal
//           promediaGeneral
//         }
//       }
//     }
//   }
// `;

// src/graphql/seguimiento/queries/seguimientoPeiObjetivo.queries.ts

export const LIST_SEGUIMIENTOS_PEI_OBJETIVOS = `
  query ListSeguimientosPeiObjetivos($limit: Int, $offset: Int) {
    listSeguimientosPeiObjetivos(limit: $limit, offset: $offset) {
      count
      results {
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
                anioFin
                anioIni
                ejecucion
                metaTotal
                observacion
              }
            }
          }
        }
        seguimientoPei {
          id
          anio
          fechaRegistro
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
      }
    }
  }
`;

export const GET_SEGUIMIENTO_PEI_OBJETIVO = `
  query GetSeguimientoPeiObjetivo($id: Int!) {
    getSeguimientoPeiObjetivo(id: $id) {
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
                anioFin
                anioIni
                ejecucion
                metaTotal
                observacion
              }
            }
          }
        }
        seguimientoPei {
          id
          anio
          fechaRegistro
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
      }
    }
  }
`;

export const GET_SEGUIMIENTOS_PEI_OBJETIVOS_ORDENADOS = `
  query GetSeguimientosPeiObjetivosOrdenados($limit: Int, $offset: Int, $orderBy: String!) {
    getSeguimientosPeiObjetivosOrdenados(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
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
                anioFin
                anioIni
                ejecucion
                metaTotal
                observacion
              }
            }
          }
        }
        seguimientoPei {
          id
          anio
          fechaRegistro
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
      }
    }
  }
`;

export const COUNT_SEGUIMIENTOS_PEI_OBJETIVOS = `
  query CountSeguimientosPeiObjetivos {
    countSeguimientosPeiObjetivos
  }
`;

export const EXISTS_SEGUIMIENTO_PEI_OBJETIVO = `
  query ExistsSeguimientoPeiObjetivo($id: Int!) {
    existsSeguimientoPeiObjetivo(id: $id)
  }
`;

// ✅ ESTA ES LA QUERY CORRECTA PARA OBTENER OBJETIVOS POR SEGUIMIENTO
export const FILTER_OBJETIVOS_POR_SEGUIMIENTO = `
  query FilterObjetivosPorSeguimiento($seguimientoPeiId: Int!, $limit: Int, $offset: Int) {
    filterSeguimientosPorSeguimientoPei(seguimientoPeiId: $seguimientoPeiId, limit: $limit, offset: $offset) {
      count
      results {
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
                anioFin
                anioIni
                ejecucion
                metaTotal
                observacion
              }
            }
          }
        }
        seguimientoPei {
          id
          anio
          fechaRegistro
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
      }
    }
  }
`;

// ✅ QUERY ADICIONAL: Filtrar por objetivo estratégico (opcional pero útil)
export const FILTER_OBJETIVOS_POR_OBJETIVO_ESTRATEGICO = `
  query FilterObjetivosPorObjetivoEstrategico($objetivoEstrategicoId: Int!, $limit: Int, $offset: Int) {
    filterSeguimientosPorObjetivo(objetivoEstrategicoId: $objetivoEstrategicoId, limit: $limit, offset: $offset) {
      count
      results {
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
                anioFin
                anioIni
                ejecucion
                metaTotal
                observacion
              }
            }
          }
        }
        seguimientoPei {
          id
          anio
          fechaRegistro
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
      }
    }
  }
`;

// ✅ QUERY ADICIONAL: Filtrar por escala de valoración (opcional)
export const FILTER_OBJETIVOS_POR_ESCALA = `
  query FilterObjetivosPorEscala($escalaValoracion: String!, $limit: Int, $offset: Int) {
    filterSeguimientosPorEscala(escalaValoracion: $escalaValoracion, limit: $limit, offset: $offset) {
      count
      results {
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
                anioFin
                anioIni
                ejecucion
                metaTotal
                observacion
              }
            }
          }
        }
        seguimientoPei {
          id
          anio
          fechaRegistro
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
      }
    }
  }
`;
