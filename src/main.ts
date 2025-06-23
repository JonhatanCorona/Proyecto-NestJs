import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddlewareGlobal } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddlewareGlobal)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
