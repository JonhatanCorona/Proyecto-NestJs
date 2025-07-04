import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "./CreateUserDto";

export class AuthCredentialDto extends PickType(CreateUserDto, ["email", "password_hash"]) {

}