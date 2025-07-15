import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  ValidateIf,
  Length,
  Matches,
  IsOptional,
  IsBoolean,
  IsUrl
} from 'class-validator';

export class UdpateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;
  
  @IsOptional()
  @IsString()
  @ValidateIf(o => o.email !== undefined && o.email.trim() !== '')
  @IsEmail({}, { message: 'El email debe ser válido' })
  @ApiProperty()
  email?: string;
  
  @IsOptional()
  @IsString()
  @Length(8, 15, { message: 'La contraseña debe tener entre 8 y 15 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
  message:
    'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)',
})
  @ValidateIf(o => o.password_hash !== undefined && o.password_hash.trim() !== '')
  password_hash?: string;
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  telefono?: string;

  @IsOptional()
  @IsBoolean()
  es_admin?: boolean;
}


export class UdpateUserResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  telefono: string;
}
