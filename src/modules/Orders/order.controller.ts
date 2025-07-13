import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { OrderService } from "./order.service";



@Controller("order")
export class OrderController{
    constructor(private readonly orderService: OrderService){}
    
@Get()
getAllOrders() {
  return this.orderService.getAllOrders();
}

@Get(':userId')
getOrders(@Param('userId', ParseIntPipe) userId: number) {
  return this.orderService.getOrdersByUser(userId);
}
}