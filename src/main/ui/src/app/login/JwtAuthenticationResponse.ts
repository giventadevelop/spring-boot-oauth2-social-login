export interface JwtAuthenticationResponse {
  accessToken: string;

  refreshToken: string;

  expiresAt: Date;

  // user: any;
}
