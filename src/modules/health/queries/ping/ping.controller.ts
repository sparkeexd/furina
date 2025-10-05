import { Injectable, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { InteractionEditReplyOptions } from 'discord.js';
import type { SlashCommandContext } from 'necord';
import { Context, SlashCommand } from 'necord';
import { CommandInterceptor } from 'src/core/interceptors/command.interceptor';
import { LoggingInterceptor } from 'src/core/interceptors/logging.interceptor';
import { PingQuery } from './ping.request.dto';
import { PingResponseDto } from './ping.response.dto';

/**
 * Controller to handle the 'ping' command.
 */
@Injectable()
@UseInterceptors(CommandInterceptor, LoggingInterceptor)
export class PingController {
    /**
     * Constructor.
     * @param queryBus The QueryBus instance to execute queries.
     */
    public constructor(private readonly queryBus: QueryBus) {}

    /**
     * Handles the 'ping' slash command.
     * Responds with a ping message and bot's latency information.
     * This message is only visible to the user who invoked the interaction.
     * @param interaction The interaction context from the slash command.
     * @returns Returns an interaction reply.
     */
    @SlashCommand({
        name: 'ping',
        description: "Check the bot's latency.",
    })
    public async ping(
        @Context() [interaction]: SlashCommandContext,
    ): Promise<InteractionEditReplyOptions> {
        const query = new PingQuery(interaction);
        const { embed } = await this.queryBus.execute<PingQuery, PingResponseDto>(query);
        return { embeds: [embed] };
    }
}
