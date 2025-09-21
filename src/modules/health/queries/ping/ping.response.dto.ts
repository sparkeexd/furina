import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { EmbedBuilder } from 'discord.js';

/**
 * Response DTO for ping handler.
 */
export class PingResponseDto {
    @ValidateNested()
    @Type(() => EmbedBuilder)
    embed: EmbedBuilder;
}
