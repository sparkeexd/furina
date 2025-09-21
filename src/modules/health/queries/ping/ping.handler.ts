import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EmbedBuilder } from 'discord.js';
import { PingQuery } from './ping.request.dto';
import { PingResponseDto } from './ping.response.dto';

/**
 * Handler to process PingQuery and return a ping message.
 */
@QueryHandler(PingQuery)
export class PingHandler implements IQueryHandler<PingQuery> {
    /**
     * Handles the ping query to return the bot's latency and websocket latency information.
     * @param query The interaction instance.
     * @returns An embed with the bot's latency details.
     */
    public async execute(query: PingQuery): Promise<PingResponseDto> {
        const { interaction } = query;

        const botLatency = Date.now() - interaction.createdTimestamp;
        const websocketLatency = Math.round(interaction.client.ws.ping);

        const embed = new EmbedBuilder()
            .setTitle('Pong! 🏓')
            .setDescription(
                `
                Bot Latency: **${botLatency}ms**
                Websocket Latency: **${websocketLatency}ms**
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
