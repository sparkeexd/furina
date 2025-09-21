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
        type: (process.env.DATABASE_TYPE as 'postgres') || 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'postgres',
    },
});
