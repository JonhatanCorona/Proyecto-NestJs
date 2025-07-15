import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, ValidateIf, Length, Matches, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @ValidateIf(o => !o.google_id)
  @IsNotEmpty({ message: 'password_hash es requerido si no se envía google_id' })
  @IsString()
  @Length(8, 15, { message: 'La contraseña debe tener entre 8 y 15 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)',
  })
  @ApiProperty()
  password_hash: string;

  @ValidateIf(o => !o.password_hash)
  @IsNotEmpty({ message: 'Google ID es requerido si no se envía password_hash' })
  @IsString()
  @ApiProperty()
  google_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  telefono: string;

  @IsOptional()
  @IsBoolean()
  es_admin?: boolean;
}

export class UserSummaryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telefono: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  es_admin: boolean;

  @ApiProperty()
  status_activo: boolean;
}
