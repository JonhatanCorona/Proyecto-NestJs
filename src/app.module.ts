import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/Auth/auth.module';
import { UserModule } from './modules/Users/user.module';
import { ProductModule } from './modules/Products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './.env.development',
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Solo en desarrollo
    }),
  }),
  AuthModule,
  UserModule,
  ProductModule,
],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
