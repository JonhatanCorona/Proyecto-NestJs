import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/Auth/auth.module';
import { UserModule } from './modules/Users/user.module';
import { ProductModule } from './modules/Products/product.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import TypeOrmConfig from  './config/tyoeorm'
import { ReservationModule } from './modules/Reservations/reservation.module';
import { ServiceModule } from './modules/Services/service.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
imports: [
    ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env.development',
  load: [TypeOrmConfig],
}),
  TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    const config = configService.get<TypeOrmModuleOptions>('typeorm');
    if (!config) {
      throw new Error('No se pudo cargar la configuración de TypeORM');
    }
    return config;
  },
}),
    AuthModule,
    UserModule,
    ProductModule,
    ReservationModule,
    ServiceModule,
    JwtModule.register({
      global: true,
      signOptions: {expiresIn: "1h"},
      secret: process.env.JWT_SECRET,
    })
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
