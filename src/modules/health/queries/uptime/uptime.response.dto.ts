import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { EmbedBuilder } from 'discord.js';

/**
 * Response DTO for uptime handler.
 */
export class UptimeResponseDto {
    @ValidateNested()
    @Type(() => EmbedBuilder)
    embed: EmbedBuilder;
}
