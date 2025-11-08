import { Config } from './env.interface';

/**
 * Configuration settings to be loaded.
 * @returns The configuration object.
 */
export const config = (): Config => ({
    app: {
        env: process.env.ENV || 'local',
    },
    necord: {
        token: process.env.DISCORD_TOKEN || '',
        development: [process.env.DISCORD_DEVELOPMENT_GUILD_ID || ''].filter(Boolean),
    },
    typeorm: {
        type: (process.env.POSTGRES_TYPE as 'postgres') || 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
        username: process.env.POSTGRES_USERNAME || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_NAME || 'postgres',
    },
});
