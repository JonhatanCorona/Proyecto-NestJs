import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { AuthService } from "../Auth/auth.service";

@Module({ 
    imports: [
TypeOrmModule.forFeature([User])
    ],
    providers: [UserService, AuthService],
    controllers: [UserController]
})
export class UserModule{

}