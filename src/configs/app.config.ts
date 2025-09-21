import { ConfigModuleOptions } from '@nestjs/config';
import { config } from './env/env.config';
import { validate } from './env/env.validation';

/**
 * App configuration keys.
 */
export const AppConfigKeys = {
    App: 'app',
} as const;

/**
 * App configuration interface mapped based on `config.ts`.
 */
export interface AppConfig {
    [AppConfigKeys.App]: AppConfigOptions;
}

/**
 * App configuration options.
 */
export interface AppConfigOptions {
    env: string;
}

/**
 * Configurations for the Config module to load in all environmental configurations.
 */
export const appConfig: ConfigModuleOptions = {
    isGlobal: true,
    load: [config],
    envFilePath: `.env.${process.env.ENV ?? 'local'}`,
    validate,
};
