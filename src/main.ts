import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddlewareGlobal } from './middleware/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      const formattedErrors = errors.map(error => ({
        property: error.property,
        constraints: error.constraints,
      }));
      return new BadRequestException(formattedErrors);
    },
  }),
);
  app.use(LoggerMiddlewareGlobal)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
