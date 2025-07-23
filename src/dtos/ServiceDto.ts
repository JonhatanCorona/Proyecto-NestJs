import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min } from "class-validator";

export class ServiceDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  duracion_min: number;
}

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número decimal con hasta 2 decimales' })
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'La duración mínima debe ser al menos 1' })
  @ApiProperty()
  duracion_min: number;

  @IsOptional()
  @IsUrl()
  image?: string;
}


export class UpdateServiceDto extends PartialType(CreateServiceDto) {}