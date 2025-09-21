import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Message, MessageFlags } from 'discord.js';

import type { SlashCommandContext } from 'necord';
import { Context, SlashCommand } from 'necord';
import { UptimeQuery } from './uptime.request.dto';
import { UptimeResponseDto } from './uptime.response.dto';

/**
 * Controller to handle the 'uptime' command.
 */
@Injectable()
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
    public async uptime(@Context() [interaction]: SlashCommandContext): Promise<Message<boolean>> {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const query = new UptimeQuery(interaction);
        const { embed } = await this.queryBus.execute<UptimeQuery, UptimeResponseDto>(query);

        return interaction.editReply({
            embeds: [embed],
        });
    }
}
