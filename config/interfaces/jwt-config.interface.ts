export interface JwtConfigurationInterface {
  jwt: {
    refreshTokenSecretKey: string;
    refreshTokenExpiresIn: number;
    accessTokenSecretKey: string;
    accessTokenExpiresIn: number;
    emailTokenSecretKey: string;
    emailTokenExpiresIn: number;
  };
}
