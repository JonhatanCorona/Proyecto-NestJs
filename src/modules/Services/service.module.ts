import { Module } from "@nestjs/common";
import { ServiceController } from "./service.controller";
import { ServiceService } from "./service.service";
import { Service } from "./service.entity";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [
    TypeOrmModule.forFeature([Service])
        ],
    providers: [ServiceService],
    controllers: [ServiceController]
})
export class ServiceModule{}