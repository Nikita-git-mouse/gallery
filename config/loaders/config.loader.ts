import { loadAppConfig } from './app-config.loader';
import { loadJwtConfig } from './jwt-config.loader';
import { loadPostgresConfig } from './postgres-config.loader';

export const loaders = [loadAppConfig, loadPostgresConfig, loadJwtConfig];
