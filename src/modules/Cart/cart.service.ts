import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from './cart.entity';
import { CartDetails } from '../CartDetails/cartDetails.entity';
import { Product } from '../Products/product.entity';
import { Order } from '../Orders/order.entity';
import { OrderDetails } from '../OrderDetails/orderDetails.entity';
import { User } from '../Users/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartDetails) private cartDetailsRepository: Repository<CartDetails>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // ✅ 1. Obtener el carrito de un usuario
  async getCartByUser(userId: number): Promise<Cart | null> {
    return await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['details', 'details.product'],
      order: { id_cart: 'DESC' },
    });
  }

  // ✅ 2. Agregar producto al carrito
async addToCart(userId: number, productId: number, cantidad: number): Promise<void> {
  let cart = await this.cartRepository.findOne({
    where: { user: { id: userId } },
    relations: ['details', 'details.product'],
  });

  const product = await this.productRepository.findOne({ where: { id: productId } });
  if (!product) throw new NotFoundException('Producto no encontrado');

  if (product.stock < 1) {
    throw new BadRequestException('Producto sin stock');
  }

  if (!cart) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    cart = this.cartRepository.create({ user });
    await this.cartRepository.save(cart);
  }

  const existingDetail = cart.details?.find(d => d.product.id === productId);
  const cantidadTotalSolicitada = (existingDetail?.cantidad || 0) + cantidad;

  if (cantidadTotalSolicitada > product.stock) {
    throw new BadRequestException(
      `Solo hay ${product.stock} unidades disponibles de "${product.name}"`,
    );
  }

  if (existingDetail) {
    existingDetail.cantidad += cantidad;
    await this.cartDetailsRepository.save(existingDetail);
  } else {
    const newDetail = this.cartDetailsRepository.create({
      cart,
      product,
      cantidad,
      precio_unitario: product.price,
    });
    await this.cartDetailsRepository.save(newDetail);
  }
}


async removeQuantityFromCart(userId: number, productId: number, cantidadToRemove: number): Promise<any> {
  const cart = await this.cartRepository.findOne({
    where: { user: { id: userId } },
    relations: ['details', 'details.product'],
  });

  if (!cart) throw new NotFoundException('Cart not found for user');

  const detail = cart.details.find(d => d.product.id === productId);

  if (!detail) throw new NotFoundException('Product not in cart');

  if (cantidadToRemove >= detail.cantidad) {
    // eliminar todo el item si se elimina la misma o más cantidad
    await this.cartDetailsRepository.remove(detail);
    return { message: `Product removed from cart` };
  } else {
    detail.cantidad -= cantidadToRemove;
    await this.cartDetailsRepository.save(detail);
    return { message: `Quantity decreased by ${cantidadToRemove}` };
  }
}


  // ✅ 3. Finalizar compra (checkout)
async checkout(userId: number): Promise<any> {
  const cart = await this.cartRepository.findOne({
    where: { user: { id: userId } },
    relations: ['details', 'details.product', 'user'],
  });

  if (!cart || cart.details.length === 0) {
    throw new Error('El carrito está vacío');
  }

  const total = cart.details.reduce(
    (sum, item) => sum + item.precio_unitario * item.cantidad,
    0,
  );

  const order = this.orderRepository.create({
    user: cart.user,
    date: new Date(),
    estado: 'pendiente',
    total,
  });
  await this.orderRepository.save(order);

  const orderDetails: OrderDetails[] = [];

for (const item of cart.details) {
  const product = item.product;

  if (product.stock < item.cantidad) {
    throw new Error(`No hay suficiente stock para el producto: ${product.name}`);
  }

  product.stock -= item.cantidad;
  await this.productRepository.save(product);

  const detail = this.orderDetailsRepository.create({
    order,
    product,
    cantidad: item.cantidad,
    precio_unitario: item.precio_unitario,
  });

  orderDetails.push(detail);
  }

  await this.orderDetailsRepository.save(orderDetails);

  // Vaciar el carrito
  await this.cartDetailsRepository.remove(cart.details);

  // Devolver orden con usuario simplificado
  return {
    ...order,
    user: {
      name: order.user.name,
    },
  };
}

}
