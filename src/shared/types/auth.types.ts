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

export interface Usuario {
  username: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  usuario: Usuario;
  accessToken: string;
  refreshToken: string;
}

export interface GraphQLLoginResponse {
  data: {
    login: LoginResponse;
  };
}

export interface LoginPayload {
  username: string;
  password: string;
  ip?: string; // Ahora opcional porque tokenAuth no lo usa
}

// Nuevos tipos para tokenAuth
export interface TokenAuthResponse {
  token: string;
  payload: any;
  refreshExpiresIn: number;
}

export interface GraphQLTokenAuthResponse {
  data: {
    tokenAuth: TokenAuthResponse;
  };
}
