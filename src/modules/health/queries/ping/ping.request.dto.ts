import { IQuery } from '@nestjs/cqrs';
import { CacheType, ChatInputCommandInteraction } from 'discord.js';

/**
 * Query object to represent a ping request.
 */
export class PingQuery implements IQuery {
    public constructor(public readonly interaction: ChatInputCommandInteraction<CacheType>) {}
}
