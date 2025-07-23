import { Body, Controller, Get, Param, Post, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBody, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/authGuard';
import { RoleGuard } from 'src/guards/roleGuard';
import { Cart } from './cart.entity';
import { AddToCartDto, RemoveFromCartDto, SimpleCartDto } from 'src/dtos/CartDto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

@Get(':userId')
@UseGuards(AuthGuard, RoleGuard)
@ApiOkResponse({ description: 'Carrito del Usuario', type: SimpleCartDto })
getCart(@Param('userId', ParseIntPipe) userId: number): Promise<SimpleCartDto | null> {
  return this.cartService.getCartByUser(userId);
}

@Post(':userId/add')
@UseGuards(AuthGuard, RoleGuard)
@ApiResponse({ status: 201, description: 'Producto añadido correctamente' })
addToCart(
  @Param('userId', ParseIntPipe) userId: number,
  @Body() addToCartDto: AddToCartDto,
) {
  const { productId, cantidad } = addToCartDto;
  return this.cartService.addToCart(userId, productId, cantidad);
}

@Post(':userId/checkout')
@ApiParam({ name: 'userId', type: Number })
@ApiResponse({ status: 201, description: 'Compra finalizada con éxito' })
@ApiResponse({ status: 400, description: 'El carrito está vacío o stock insuficiente' })
checkout(@Param('userId', ParseIntPipe) userId: number) {
  return this.cartService.checkout(userId);
}

@Delete(':userId/remove/:productId')
@UseGuards(AuthGuard, RoleGuard)
@ApiOkResponse({ description: 'Producto/s Eliminado/s' })
@ApiBody({ type: RemoveFromCartDto })
removeFromCart(
  @Param('userId', ParseIntPipe) userId: number,
  @Param('productId', ParseIntPipe) productId: number,
  @Body() body: RemoveFromCartDto,
) {
  return this.cartService.removeQuantityFromCart(userId, productId, body.cantidad);
}

}
