// export interface Usuario {
//   username: string;
// }

// export interface LoginResponse {
//   success: boolean;
//   message: string;
//   usuario: Usuario;
//   accessToken: string;
//   refreshToken: string; // AGREGADO
// }

// export interface GraphQLLoginResponse {
//   data: {
//     login: LoginResponse;
//   };
// }

// export interface LoginPayload {
//   username: string;
//   password: string;
//   ip: string;
// }

// export interface Usuario {
//   username: string;
// }

// export interface LoginResponse {
//   success: boolean;
//   message: string;
//   usuario: Usuario;
//   accessToken: string;
//   refreshToken: string;
// }

// export interface GraphQLLoginResponse {
//   data: {
//     login: LoginResponse;
//   };
// }

// export interface LoginPayload {
//   username: string;
//   password: string;
//   ip?: string; // Ahora opcional porque tokenAuth no lo usa
// }

// // Nuevos tipos para tokenAuth
// export interface TokenAuthResponse {
//   token: string;
//   payload: any;
//   refreshExpiresIn: number;
// }

// export interface GraphQLTokenAuthResponse {
//   data: {
//     tokenAuth: TokenAuthResponse;
//   };
// }

// src/shared/types/auth.types.ts
export interface Usuario {
  id: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  internalCode?: string;
  accessToken: string;
  refreshToken: string;
  usuario: Usuario;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RefreshTokenResponse {
  token: string;
  payload: any;
  refreshExpiresIn: number;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface RequestPasswordResetResponse {
  success: boolean;
  message: string;
  uid: string;
  token: string;
}

export interface ConfirmPasswordResetResponse {
  success: boolean;
  message: string;
}

export interface MeQueryResponse {
  me: {
    id: string;
    username: string;
    email: string;
    isActive: boolean;
    isStaff: boolean;
  } | null;
}
