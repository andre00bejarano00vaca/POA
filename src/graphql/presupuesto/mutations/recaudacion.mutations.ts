// src/graphql/presupuesto/mutations/recaudacion.mutations.ts

export const CREATE_RECAUDACION = `
  mutation CreateRecaudacion(
    $description: String!
    $codOec: String!
    $nBienes: Int!
    $costoUServicio: Float!
    $totalDouble: Float!
    $idRubro: Int!
  ) {
    createRecaudacion(
      description: $description
      codOec: $codOec
      nBienes: $nBienes
      costoUServicio: $costoUServicio
      totalDouble: $totalDouble
      idRubro: $idRubro
    ) {
      success
      message
      data {
        id
        description
        codOec
        nBienes
        costoUServicio
        totalDouble
        idRubro {
          id
          description
          importeDouble
        }
      }
    }
  }
`;

export const UPDATE_RECAUDACION = `
  mutation UpdateRecaudacion(
    $id: Int!
    $description: String
    $codOec: String
    $nBienes: Int
    $costoUServicio: Float
    $totalDouble: Float
    $idRubro: Int
  ) {
    updateRecaudacion(
      id: $id
      description: $description
      codOec: $codOec
      nBienes: $nBienes
      costoUServicio: $costoUServicio
      totalDouble: $totalDouble
      idRubro: $idRubro
    ) {
      success
      message
      data {
        id
        description
        codOec
        nBienes
        costoUServicio
        totalDouble
        idRubro {
          id
          description
          importeDouble
        }
      }
    }
  }
`;

export const DELETE_RECAUDACION = `
  mutation DeleteRecaudacion($id: Int!) {
    deleteRecaudacion(id: $id) {
      success
      message
      data
    }
  }
`;
