// // src/graphql/auth/mutations/auth.mutations.ts
// import { gql } from "graphql-tag";

// // LOGIN
// export const LOGIN_MUTATION = gql`
//   mutation Login($username: String!, $password: String!) {
//     login(username: $username, password: $password) {
//       success
//       message
//       internalCode
//       accessToken
//       refreshToken
//       usuario {
//         id
//         username
//         email
//       }
//     }
//   }
// `;

// // REFRESH TOKEN - Mutación automática de django-graphql-jwt
// export const REFRESH_TOKEN_MUTATION = gql`
//   mutation RefreshToken($token: String!) {
//     refreshToken(token: $token) {
//       token
//       payload
//       refreshExpiresIn
//     }
//   }
// `;

// // LOGOUT
// export const LOGOUT_MUTATION = gql`
//   mutation Logout {
//     logout {
//       success
//       message
//     }
//   }
// `;

// // REQUEST PASSWORD RESET
// export const REQUEST_PASSWORD_RESET_MUTATION = gql`
//   mutation RequestPasswordReset($email: String!) {
//     requestPasswordReset(email: $email) {
//       success
//       message
//       uid
//       token
//     }
//   }
// `;

// // CONFIRM PASSWORD RESET
// export const CONFIRM_PASSWORD_RESET_MUTATION = gql`
//   mutation ConfirmPasswordReset(
//     $uid: String!
//     $token: String!
//     $newPassword: String!
//   ) {
//     confirmPasswordReset(uid: $uid, token: $token, newPassword: $newPassword) {
//       success
//       message
//     }
//   }
// `;

// // TOKEN AUTH - Mutación alternativa de django-graphql-jwt
// export const TOKEN_AUTH_MUTATION = gql`
//   mutation TokenAuth($username: String!, $password: String!) {
//     tokenAuth(username: $username, password: $password) {
//       token
//       payload
//       refreshExpiresIn
//     }
//   }
// `;

// // VERIFY TOKEN
// export const VERIFY_TOKEN_MUTATION = gql`
//   mutation VerifyToken($token: String!) {
//     verifyToken(token: $token) {
//       payload
//     }
//   }
// `;



// =====================================
// AUTH MUTATIONS (SIN gql)
// =====================================


// -------------------------------------
// LOGIN
// -------------------------------------
export const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      message
      internalCode
      accessToken
      refreshToken
      usuario {
        id
        username
        email
      }
    }
  }
`;


// -------------------------------------
// REFRESH TOKEN (django-graphql-jwt)
// -------------------------------------
export const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
      payload
      refreshExpiresIn
    }
  }
`;


// -------------------------------------
// LOGOUT
// -------------------------------------
export const LOGOUT_MUTATION = `
  mutation Logout {
    logout {
      success
      message
    }
  }
`;


// -------------------------------------
// REQUEST PASSWORD RESET
// -------------------------------------
export const REQUEST_PASSWORD_RESET_MUTATION = `
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email) {
      success
      message
      uid
      token
    }
  }
`;


// -------------------------------------
// CONFIRM PASSWORD RESET
// -------------------------------------
export const CONFIRM_PASSWORD_RESET_MUTATION = `
  mutation ConfirmPasswordReset(
    $uid: String!
    $token: String!
    $newPassword: String!
  ) {
    confirmPasswordReset(
      uid: $uid
      token: $token
      newPassword: $newPassword
    ) {
      success
      message
    }
  }
`;


// -------------------------------------
// TOKEN AUTH (alternativa jwt)
// -------------------------------------
export const TOKEN_AUTH_MUTATION = `
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      payload
      refreshExpiresIn
    }
  }
`;


// -------------------------------------
// VERIFY TOKEN
// -------------------------------------
export const VERIFY_TOKEN_MUTATION = `
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;
