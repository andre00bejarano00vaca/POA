// src/graphql/pei/mutations/matrizPei.mutations.ts

export const CREATE_MATRIZ_PEI = `
  mutation CreateMatrizPei(
    $anioBase: Int!
    $metaMedianoPlazo: Int!
    $peiId: Int!
    $objetivoEstrategicoId: Int!
    $productoInstitucionalId: Int!
    $accionEstrategicaId: Int!
    $indicadorPeiId: Int!
    $unidadEjecutoraId: Int!
  ) {
    createMatrizPei(
      anioBase: $anioBase
      metaMedianoPlazo: $metaMedianoPlazo
      peiId: $peiId
      objetivoEstrategicoId: $objetivoEstrategicoId
      productoInstitucionalId: $productoInstitucionalId
      accionEstrategicaId: $accionEstrategicaId
      indicadorPeiId: $indicadorPeiId
      unidadEjecutoraId: $unidadEjecutoraId
    ) {
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
        }
        objetivoEstrategico {
          id
          description
        }
        productoInstitucional {
          id
          description
        }
        accionEstrategica {
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

export const UPDATE_MATRIZ_PEI = `
  mutation UpdateMatrizPei(
    $id: Int!
    $anioBase: Int
    $metaMedianoPlazo: Int
    $peiId: Int
    $objetivoEstrategicoId: Int
    $productoInstitucionalId: Int
    $accionEstrategicaId: Int
    $indicadorPeiId: Int
    $unidadEjecutoraId: Int
  ) {
    updateMatrizPei(
      id: $id
      anioBase: $anioBase
      metaMedianoPlazo: $metaMedianoPlazo
      peiId: $peiId
      objetivoEstrategicoId: $objetivoEstrategicoId
      productoInstitucionalId: $productoInstitucionalId
      accionEstrategicaId: $accionEstrategicaId
      indicadorPeiId: $indicadorPeiId
      unidadEjecutoraId: $unidadEjecutoraId
    ) {
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
        }
        objetivoEstrategico {
          id
          description
        }
        productoInstitucional {
          id
          description
        }
        accionEstrategica {
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

export const DELETE_MATRIZ_PEI = `
  mutation DeleteMatrizPei($id: Int!) {
    deleteMatrizPei(id: $id) {
      success
      message
      data
    }
  }
`;
