import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { NecordModule } from 'necord';
import { AppService } from './app.service';
import { appConfig } from './configs/app.config';
import { necordConfig } from './configs/necord.config';
import { HealthModule } from './modules/health/health.module';

/**
 * The main application module.
 */
@Module({
    imports: [
        CqrsModule.forRoot(),
        ConfigModule.forRoot(appConfig),
        NecordModule.forRootAsync(necordConfig),
        HealthModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
