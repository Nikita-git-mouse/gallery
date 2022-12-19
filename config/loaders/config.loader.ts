import { loadAppConfig } from './app-config.loader';
import { loadPostgresConfig } from './postgres-config.loader';

export const loaders = [loadAppConfig, loadPostgresConfig];
