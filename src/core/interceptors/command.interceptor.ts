import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { CacheType, EmbedBuilder, Interaction, InteractionEditReplyOptions } from 'discord.js';
import { NecordExecutionContext, SlashCommandContext } from 'necord';
import { Observable, switchMap } from 'rxjs';

/**
 * Interceptor to handle Discord command interactions.
 */
@Injectable()
export class CommandInterceptor implements NestInterceptor {
    /**
     * Intercepts the command interaction.
     * Incoming: Automatically defers the reply to avoid timing out. https://discordjs.guide/slash-commands/response-methods.html#deferred-responses
     * Outgoing: Set default embed properties (e.g. bot author and timestamp) before replying unless they are already set by the handlers.
     * @param context The execution context.
     * @param next The response stream for handling after the execution of the command's handler.
     * @returns Sends interaction reply to the client.
     */
    public async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<void>> {
        const necordContext = NecordExecutionContext.create(context);
        const [interaction] = necordContext.getContext<SlashCommandContext>();

        if (!interaction.isChatInputCommand()) {
            return next.handle();
        }

        await interaction.deferReply();

        return next.handle().pipe(
            switchMap(async (data: InteractionEditReplyOptions) => {
                if (data.embeds) {
                    data.embeds = data.embeds.map((embed: EmbedBuilder) =>
                        this.applyDefaultEmbedProperties(interaction, embed),
                    );
                }

                await interaction.editReply(data);
            }),
        );
    }

    /**
     * Set default embed properties given they are not handled by the command's handler.
     * @param interaction The interaction context.
     * @param data The interaction response data.
     * @returns The modified embed of `data`.
     */
    private applyDefaultEmbedProperties(
        interaction: Interaction<CacheType>,
        embed: EmbedBuilder,
    ): EmbedBuilder {
        const { color, author, timestamp } = embed.data;

        return embed
            .setColor(color || 0x2d4286) // Default dark blue color.
            .setAuthor({
                name: author?.name || interaction.client.user.username,
                iconURL: author?.icon_url || interaction.client.user.displayAvatarURL(),
            })
            .setTimestamp(new Date(timestamp ?? Date.now()));
    }
}
