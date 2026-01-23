// src/graphql/pei/queries/matrizPei.queries.ts

export const LIST_MATRICES_PEI = `
  query ListMatricesPei($limit: Int!, $offset: Int!) {
    listMatricesPei(limit: $limit, offset: $offset) {
      count
      results {
        id
        anioBase
        metaMedianoPlazo
        pei {
          id
          anioIni
          anioFin
          metaTotal
          ejecucion
          observacion
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
            }
          }
        }
        productoInstitucional {
          id
          description
          idPi
        }
        accionEstrategica {
          id
          description
        }
        indicadorPei {
          id
          description
          formula
          unidadMedida
          lineaBase
          meta
        }
        unidadEjecutora {
          id
          description
          techoPres
          direccionAdministrativa {
            id
            description
            entidad {
              id
              codigo
              sigla
            }
          }
        }
      }
    }
  }
`;

export const GET_MATRIZ_PEI = `
  query GetMatrizPei($id: Int!) {
    getMatrizPei(id: $id) {
      success
      message
      data {
        id
        anioBase
        metaMedianoPlazo
        pei {
          id
          anioIni
          anioFin
          metaTotal
          ejecucion
          observacion
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
            }
          }
        }
        productoInstitucional {
          id
          description
          idPi
        }
        accionEstrategica {
          id
          description
        }
        indicadorPei {
          id
          description
          formula
          unidadMedida
          lineaBase
          meta
        }
        unidadEjecutora {
          id
          description
          techoPres
          direccionAdministrativa {
            id
            description
            entidad {
              id
              codigo
              sigla
            }
          }
        }
      }
    }
  }
`;

export const FILTER_MATRICES_POR_PEI = `
  query FilterMatricesPorPei($peiId: Int!, $limit: Int!, $offset: Int!) {
    filterMatricesPorPei(peiId: $peiId, limit: $limit, offset: $offset) {
      count
      results {
        id
        anioBase
        metaMedianoPlazo
        pei {
          id
          anioIni
          anioFin
        }
        objetivoEstrategico {
          id
          description
        }
        indicadorPei {
          id
          description
        }
        unidadEjecutora {
          id
          description
        }
      }
    }
  }
`;

export const FILTER_MATRICES_POR_OBJETIVO = `
  query FilterMatricesPorObjetivo($objetivoEstrategicoId: Int!, $limit: Int!, $offset: Int!) {
    filterMatricesPorObjetivo(objetivoEstrategicoId: $objetivoEstrategicoId, limit: $limit, offset: $offset) {
      count
      results {
        id
        anioBase
        metaMedianoPlazo
        objetivoEstrategico {
          id
          description
        }
        indicadorPei {
          id
          description
        }
      }
    }
  }
`;

export const FILTER_MATRICES_POR_INDICADOR = `
  query FilterMatricesPorIndicador($indicadorPeiId: Int!, $limit: Int!, $offset: Int!) {
    filterMatricesPorIndicador(indicadorPeiId: $indicadorPeiId, limit: $limit, offset: $offset) {
      count
      results {
        id
        anioBase
        metaMedianoPlazo
        indicadorPei {
          id
          description
        }
      }
    }
  }
`;

export const FILTER_MATRICES_POR_UNIDAD_EJECUTORA = `
  query FilterMatricesPorUnidadEjecutora($unidadEjecutoraId: Int!, $limit: Int!, $offset: Int!) {
    filterMatricesPorUnidadEjecutora(unidadEjecutoraId: $unidadEjecutoraId, limit: $limit, offset: $offset) {
      count
      results {
        id
        anioBase
        metaMedianoPlazo
        unidadEjecutora {
          id
          description
        }
      }
    }
  }
`;

export const GET_MATRICES_PEI_ORDENADAS = `
  query GetMatricesPeiOrdenadas($limit: Int!, $offset: Int!, $orderBy: String!) {
    getMatricesPeiOrdenadas(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
        id
        anioBase
        metaMedianoPlazo
        pei {
          id
          anioIni
          anioFin
        }
        objetivoEstrategico {
          id
          description
        }
      }
    }
  }
`;

export const COUNT_MATRICES_PEI = `
  query CountMatricesPei {
    countMatricesPei
  }
`;

export const EXISTS_MATRIZ_PEI = `
  query ExistsMatrizPei($id: Int!) {
    existsMatrizPei(id: $id)
  }
`;
