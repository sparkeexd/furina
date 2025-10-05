import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EmbedBuilder, time, TimestampStyles } from 'discord.js';
import humanizeDuration from 'humanize-duration';
import { UptimeQuery } from './uptime.request.dto';
import { UptimeResponseDto } from './uptime.response.dto';

/**
 * Handler to process UptimeQuery and return a uptime message.
 */
@QueryHandler(UptimeQuery)
export class UptimeHandler implements IQueryHandler<UptimeQuery> {
    /**
     * Handles the uptime query to return the bot's last restart and uptime information.
     * @param query The interaction instance.
     * @returns An embed with the bot's uptime details.
     */
    public async execute(query: UptimeQuery): Promise<UptimeResponseDto> {
        const { interaction } = query;

        const uptime = interaction.client.uptime;
        const lastRestart = new Date(Date.now() - uptime);

        const embed = new EmbedBuilder().setTitle('Uptime ⏱️').setDescription(
            `
            **Last Restart**: ${time(lastRestart, TimestampStyles.RelativeTime)}
            **Uptime**: ${humanizeDuration(uptime, { units: ['d', 'h', 'm', 's'], round: true })}
            `,
        );

        return { embed };
    }
}
