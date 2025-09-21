import { plainToInstance, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

/**
 * Possible application environments.
 */
export enum Environment {
    Local = 'local',
    Development = 'development',
    Production = 'production',
}

/**
 * Environment validation rules.
 */
export class EnvironmentValidation {
    @IsEnum(Environment)
    ENV: Environment = Environment.Local;

    @IsString()
    @IsNotEmpty()
    DISCORD_TOKEN: string;

    @IsString()
    @IsOptional()
    DISCORD_DEVELOPMENT_GUILD_ID: string;

    @IsEnum(['postgres'])
    DATABASE_TYPE: 'postgres' = 'postgres';

    @IsString()
    @IsNotEmpty()
    DATABASE_USER: string;

    @IsString()
    @IsNotEmpty()
    DATABASE_PASSWORD: string;

    @IsString()
    @IsNotEmpty()
    DATABASE_HOST: string;

    @Type(() => Number)
    @IsNumber()
    DATABASE_PORT: number;

    @IsString()
    @IsNotEmpty()
    DATABASE_NAME: string;
}

/**
 * Validates the given configuration object against the `EnvironmentValidation` schema.
 * @param config The configuration object to validate.
 * @returns
 */
export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentValidation, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
