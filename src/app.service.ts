import { Injectable, Logger } from '@nestjs/common';

import { Events } from 'discord.js';
import type { ContextOf } from 'necord';
import { Context, On, Once } from 'necord';

/**
 * App service that handles incoming Discord bot events.
 */
@Injectable()
export class AppService {
    /**
     * Logger.
     */
    private readonly logger = new Logger(AppService.name);

    /**
     * Notify the bot is ready.
     * @param client The Discord bot client.
     */
    @Once(Events.ClientReady)
    public onReady(@Context() [client]: ContextOf<Events.ClientReady>) {
        this.logger.log(`Bot logged in as ${client.user.tag}`);
    }

    /**
     * Prevent bot from responding to itself.
     * @param message The message context.
     */
    @On(Events.MessageCreate)
    public onMessageCreate(@Context() [message]: ContextOf<Events.MessageCreate>) {
        if (message.author.bot) return;
    }
}
