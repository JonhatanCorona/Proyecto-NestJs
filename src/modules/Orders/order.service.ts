import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { Repository } from "typeorm";

Injectable({})
export class OrderService{

   constructor(

      @InjectRepository(Order) private orderRepository: Repository<Order>,

     ) {}
   
async getAllOrders(): Promise<any[]> {
  const orders = await this.orderRepository.find({
    relations: ['user', 'details', 'details.product'],
    order: { date: 'ASC' },
  });

  return orders.map(order => ({
    id_orden: order.id_orden,
    date: order.date,
    total: order.total,
    estado: order.estado,
    user: {
      id: order.user.id,
      name: order.user.name,
    },
    details: order.details.map(detail => ({
      id_order: detail.id_order,
      precio_unitario: detail.precio_unitario,
      cantidad: detail.cantidad,
      product: {
        id: detail.product.id,
        name: detail.product.name,
        description: detail.product.description,
        url_image: detail.product.url_image,
      },
    })),
  }));
}



   async getOrdersByUser(userId: number): Promise<Order[]> {
      return this.orderRepository.find({
   where: { user: { id: userId } },
   relations: ['details', 'details.product'], // Trae detalles y productos
   order: { date: 'DESC' }, // Opcional, ordena por fecha descendente
});
}

}