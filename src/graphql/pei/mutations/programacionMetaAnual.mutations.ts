// src/graphql/pei/mutations/programacionMetaAnual.mutations.ts

export const UPDATE_PROGRAMACION_META_ANUAL = `
  mutation UpdateProgramacionMetaAnual($id: Int!, $programado: Int!) {
    updateProgramacionMetaAnual(id: $id, programado: $programado) {
      success
      message
      data {
        id
        anio
        programado
        idIndicadorPeiImp {
          id
          description
          unidadMedida
        }
        peiIdPei {
          id
          anioIni
          anioFin
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
