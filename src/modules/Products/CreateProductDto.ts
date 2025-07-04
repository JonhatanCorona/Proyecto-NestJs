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
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe tener hasta 2 decimales' })
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  price: number;

  @IsNotEmpty()
  @IsInt({ message: 'El stock debe ser un número entero' })
  @IsPositive({ message: 'El stock debe ser positivo' })
  stock: number;

  @IsNotEmpty()
  @IsUrl({}, { message: 'Debe ser una URL válida' })
  url_image: string;
}
