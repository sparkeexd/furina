import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Configuration keys for the TypeORM module.
 */
export const TypeOrmKeys = {
    TypeOrm: 'typeorm',
} as const;

/**
 * TypeORM configuration interface mapped based on `config.ts`.
 */
export interface TypeOrmConfig {
    [TypeOrmKeys.TypeOrm]: TypeOrmConfigOptions;
}

/**
 * TypeORM configuration options.
 */
export interface TypeOrmConfigOptions {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

/**
 * Configurations for the TypeORM module.
 */
export const typeORMConfig = {
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const moduleConfigOptions = configService.get<TypeOrmModuleOptions>(TypeOrmKeys.TypeOrm);

        if (!moduleConfigOptions) {
            throw new Error('TypeORM configuration is not defined');
        }

        return {
            ...moduleConfigOptions,
            entities: [__dirname + '/../../**/*.entity{.ts,.js}'], // FIXME: Adjust the path as necessary
            synchronize: false,
        };
    },
};
