import { IsNotEmpty, IsEmail, IsString, ValidateIf, Length, Matches, IsOptional, IsBoolean } from 'class-validator';

export class UdpateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15, { message: 'La contraseña debe tener entre 8 y 15 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)',
  })
  password_hash: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsOptional()
  @IsBoolean()
  es_admin?: boolean;
}