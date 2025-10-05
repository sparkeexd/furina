import { IQuery } from '@nestjs/cqrs';
import { CacheType, ChatInputCommandInteraction } from 'discord.js';

/**
 * Query object to represent an uptime request.
 */
export class UptimeQuery implements IQuery {
    /**
     * Constructor.
     * @param interaction The interaction context from the slash command.
     */
    public constructor(public readonly interaction: ChatInputCommandInteraction<CacheType>) {}
}
