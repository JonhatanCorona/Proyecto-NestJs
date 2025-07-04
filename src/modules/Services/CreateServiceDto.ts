import { IsNotEmpty, IsString, IsNumber, IsInt, Min, IsOptional, IsUrl } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número decimal con hasta 2 decimales' })
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'La duración mínima debe ser al menos 1' })
  duracion_min: number;

  @IsOptional()
  @IsUrl()
  image?: string;
}
