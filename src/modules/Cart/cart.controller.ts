import { Body, Controller, Get, Param, Post, ParseIntPipe, Delete } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  getCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.getCartByUser(userId);
  }

  @Post(':userId/add')
  addToCart(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() { productId, cantidad }: { productId: number; cantidad: number },
  ) {
    return this.cartService.addToCart(userId, productId, cantidad);
  }

 @Delete(':userId/remove/:productId')
  removeFromCart(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Body('cantidad') cantidad: number,  // cantidad a eliminar pasada en body
  ) {
    return this.cartService.removeQuantityFromCart(userId, productId, cantidad);
  }

  @Post(':userId/checkout')
  checkout(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.checkout(userId);
  }
}
