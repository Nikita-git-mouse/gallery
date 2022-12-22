export interface AppConfigurationInterface {
  app: {
    port: number;
    host: string;
    protocol: 'http' | 'https';
    ssl: {
      key: string;
      cert: string;
    };
  };
}
