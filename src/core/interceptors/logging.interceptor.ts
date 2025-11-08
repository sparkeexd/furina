import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { NecordExecutionContext, SlashCommandContext } from 'necord';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Interceptor to handle logging of slash commands.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    /**
     * Logger.
     */
    private readonly logger = new Logger(LoggingInterceptor.name);

    /**
     * Logs the incoming and outgoing of a command interaction.
     * @param context The execution context.
     * @param next The response stream for handling after the execution of the command's handler.
     * @returns Logs the command interaction.
     */
    public intercept<T>(context: ExecutionContext, next: CallHandler): Observable<T> {
        const necordContext = NecordExecutionContext.create(context);
        const [interaction] = necordContext.getContext<SlashCommandContext>();

        this.logger.log(`Handling command: ${interaction.commandName}`);

        return next
            .handle()
            .pipe(
                tap<T>(() =>
                    this.logger.log(`Finished handling command: ${interaction.commandName}`),
                ),
            );
    }
}
