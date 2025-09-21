import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EmbedBuilder, time, TimestampStyles } from 'discord.js';
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

        const days = Math.floor(uptime / 86400000);
        const hours = Math.floor(uptime / 3600000) % 24;
        const minutes = Math.floor(uptime / 60000) % 60;
        const seconds = Math.floor(uptime / 1000) % 60;

        const uptimeParts: string[] = [];
        if (days > 0) uptimeParts.push(`${days} days`);
        if (hours > 0) uptimeParts.push(`${hours} hours`);
        if (minutes > 0) uptimeParts.push(`${minutes} minutes`);
        if (seconds > 0) uptimeParts.push(`${seconds} seconds`);

        const embed = new EmbedBuilder()
            .setTitle('Uptime ⏱️')
            .setDescription(
                `
                **Last Restart**: ${time(lastRestart, TimestampStyles.RelativeTime)}
                **Uptime**: ${uptimeParts.join(', ')}
                `,
            )
            .setAuthor({
                name: interaction.client.user.username,
                iconURL: interaction.client.user.displayAvatarURL(),
            })
            .setTimestamp();

        return { embed };
    }
}
