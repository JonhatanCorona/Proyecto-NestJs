import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { Repository } from "typeorm";
import { SimpleOrderDto } from "src/dtos/OrderDto";

Injectable({})
export class OrderService{

   constructor(

      @InjectRepository(Order) private orderRepository: Repository<Order>,

     ) {}
   
async getAllOrders(): Promise<SimpleOrderDto[]> {
  const orders = await this.orderRepository.find({
    relations: ['details', 'details.product'],
  });

  return orders.map(order => ({
    id_orden: order.id_orden,
    date: order.date,
    total: order.total,
    estado: order.estado,
    details: order.details.map(detail => ({
      product: {
        name: detail.product.name,
        price: detail.product.price,
      },
      cantidad: detail.cantidad,
      precio_unitario: detail.precio_unitario,
    })),
  }));
}


   async getOrdersByUser(userId: number): Promise<SimpleOrderDto[]> {
      return this.orderRepository.find({
   where: { user: { id: userId } },
   relations: ['details', 'details.product'],
   order: { date: 'DESC' }, 
});
}

}