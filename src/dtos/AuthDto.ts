import { ApiProperty, PickType } from "@nestjs/swagger";
import { CreateUserDto } from "./UserDto";
import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";

export class AuthCredentialDto extends PickType(CreateUserDto, ["email", "password_hash"]) {

}

export class AuthUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ type: [String] })
  role: string[];

  @ApiProperty()
  image: string;
}

export class SignupResponseDto {
  @ApiProperty({ example: 'Usuario registrado correctamente' })
  message: string;
}

export class SignInResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  password: boolean;

  @ApiProperty({ type: AuthUserDto })
  user: AuthUserDto;
}

export class GoogleProfileDto {
  @IsString()
  @ApiProperty()
  sub: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  name: string;
  
  @IsOptional()
  @IsUrl()
  @ApiProperty()
  image?: string;
}
