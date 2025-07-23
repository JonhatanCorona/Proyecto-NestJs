import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class SimpleCartProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}

export class SimpleCartDetailDto {
  @ApiProperty()
  product: SimpleCartProductDto;

  @ApiProperty()
  cantidad: number;

  @ApiProperty()
  precio_unitario: number;
}

export class SimpleCartDto {
  @ApiProperty()
  id_cart: number;

  @ApiProperty()
  fecha_creacion: Date;

  @ApiProperty({ type: [SimpleCartDetailDto] })
  details: SimpleCartDetailDto[];
}


export class AddToCartDto {
  @ApiProperty({ example: 1, description: 'ID del producto a añadir al carrito' })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 2, description: 'Cantidad del producto a añadir' })
  @IsInt()
  @Min(1)
  cantidad: number;
}


export class RemoveFromCartDto {
  @ApiProperty({ example: 1, description: 'Cantidad a eliminar del producto en el carrito' })
  @IsInt()
  @Min(1)
  cantidad: number;
}