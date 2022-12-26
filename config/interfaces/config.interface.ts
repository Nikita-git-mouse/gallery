import { AppConfigurationInterface } from './app-config.interface';
import { FileStorageConfigurationInterface } from './file-storage-config.interface';
import { JwtConfigurationInterface } from './jwt-config.interface';
import { PostgresConfigurationInterface } from './postgres-config.interface';

export interface ConfigInterface
  extends AppConfigurationInterface,
    JwtConfigurationInterface,
    FileStorageConfigurationInterface,
    PostgresConfigurationInterface {}
