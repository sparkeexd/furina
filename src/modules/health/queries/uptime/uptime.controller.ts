import { Injectable, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { InteractionEditReplyOptions } from 'discord.js';
import type { SlashCommandContext } from 'necord';
import { Context, SlashCommand } from 'necord';
import { CommandInterceptor } from 'src/core/interceptors/command.interceptor';
import { LoggingInterceptor } from 'src/core/interceptors/logging.interceptor';
import { UptimeQuery } from './uptime.request.dto';
import { UptimeResponseDto } from './uptime.response.dto';

/**
 * Controller to handle the 'uptime' command.
 */
@Injectable()
@UseInterceptors(CommandInterceptor, LoggingInterceptor)
export class UptimeController {
    /**
     * Constructor.
     * @param queryBus The QueryBus instance to execute queries.
     */
    public constructor(private readonly queryBus: QueryBus) {}

    /**
     * Handles the 'uptime' slash command.
     * Returns the bot's uptime information i.e., last restart and uptime duration.
     * This message is only visible to the user who invoked the interaction.
     * @param interaction The interaction context from the slash command.
     * @returns Returns an interaction reply.
     */
    @SlashCommand({
        name: 'uptime',
        description: "Check the bot's uptime.",
    })
    public async uptime(
        @Context() [interaction]: SlashCommandContext,
    ): Promise<InteractionEditReplyOptions> {
        const query = new UptimeQuery(interaction);
        const { embed } = await this.queryBus.execute<UptimeQuery, UptimeResponseDto>(query);
        return { embeds: [embed] };
    }
}
