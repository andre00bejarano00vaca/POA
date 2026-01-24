import { gql } from "graphql-tag";

// ✅ ME QUERY - Obtener usuario autenticado
export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
      isActive
      isStaff
    }
  }
`;
