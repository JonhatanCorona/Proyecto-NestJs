import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddlewareGlobal } from './middleware/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware global de logging
  app.use(LoggerMiddlewareGlobal);

  // Validación global con excepciones personalizadas
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // Rechaza propiedades no permitidas
      transform: true, // Convierte payloads a los tipos esperados
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map(error => ({
          property: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          message: 'Error de validación',
          errors: formattedErrors,
        });
      },
    }),
  );

  // Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest')
    .setDescription('Este es una API construida con NestJS para mi backend')
    .setVersion('1.0.0') // Versión semántica, evita usar ^ en Swagger
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
