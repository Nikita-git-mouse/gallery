export interface PostgresConfigurationInterface {
  postgres: {
    port: number;
    host: string;
    username: string;
    password: string;
  };
}
