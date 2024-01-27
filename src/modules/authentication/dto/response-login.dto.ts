export class ResponseLogin {
  accessToken: string;
  role: number;
  refreshToken?: string;
  iat?: number;
  exp?: number;
  _id?: string;
}
