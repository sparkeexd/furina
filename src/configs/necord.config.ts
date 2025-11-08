import { ConfigService } from '@nestjs/config';
import { IntentsBitField } from 'discord.js';
import { NecordModuleOptions } from 'necord';

/**
 * Configuration keys for the Necord module.
 */
export const NecordConfigKeys = {
    Necord: 'necord',
} as const;

/**
 * Necord configuration interface mapped based on `config.ts`.
 */
export interface NecordConfig {
    [NecordConfigKeys.Necord]: NecordConfigOptions;
}

/**
 * Necord configuration options.
 */
export interface NecordConfigOptions {
    token: string;
    development: string[];
}

/**
 * Configurations for the Necord module.
 */
export const necordConfig = {
    useFactory: (configService: ConfigService): NecordModuleOptions => {
        const options = configService.get<NecordConfigOptions>(NecordConfigKeys.Necord);

        if (!options) {
            throw new Error('Necord configuration is not defined');
        }

        return {
            ...options,
            intents: [IntentsBitField.Flags.Guilds],
        };
    },
    inject: [ConfigService],
};
