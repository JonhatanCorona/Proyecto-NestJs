import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsInt,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe tener hasta 2 decimales' })
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsInt({ message: 'El stock debe ser un número entero' })
  @IsPositive({ message: 'El stock debe ser positivo' })
  @ApiProperty()
  stock: number;

  @IsNotEmpty()
  @IsUrl({}, { message: 'Debe ser una URL válida' })
  @ApiProperty()
  url_image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}