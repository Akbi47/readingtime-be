export class ResponseLogin {
  accessToken: string;
  role?: number;
  refreshToken?: string;
  iat?: number;
  exp?: number;
  expRefresh?: number;
  _id?: string;
}
