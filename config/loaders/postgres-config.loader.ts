import { PostgresConfigurationInterface } from '../interfaces';

export const loadPostgresConfig = (): PostgresConfigurationInterface => ({
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USER,
  },
});
