import { ApiProperty } from '@nestjs/swagger';

export class SimpleOrderProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}

export class SimpleOrderDetailDto {
  @ApiProperty()
  product: SimpleOrderProductDto;

  @ApiProperty()
  cantidad: number;
}

export class SimpleOrderDto {
  @ApiProperty()
  id_orden: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  total: number;

  @ApiProperty()
  estado: string;

  @ApiProperty({ type: [SimpleOrderDetailDto] })
  details: SimpleOrderDetailDto[];
}
