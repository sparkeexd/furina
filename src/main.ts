import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Bootstrap the NestJS application.
 */
async function bootstrap() {
    await NestFactory.createApplicationContext(AppModule);
}

bootstrap();
