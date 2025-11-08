import { Module } from '@nestjs/common';
import { PingController } from './queries/ping/ping.controller';
import { PingHandler } from './queries/ping/ping.handler';
import { UptimeController } from './queries/uptime/uptime.controller';
import { UptimeHandler } from './queries/uptime/uptime.handler';

/**
 * Health module to query bot's latency and uptime.
 */
@Module({
    providers: [PingController, PingHandler, UptimeController, UptimeHandler],
})
export class HealthModule {}
