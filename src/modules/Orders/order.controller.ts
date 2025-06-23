import { Controller, Get } from "@nestjs/common";
import { OrderService } from "./order.service";



@Controller("auth")
export class OrderController{
    constructor(private readonly orderService: OrderService){}

    @Get()
        getCart () {
            return this.orderService.getOrder()
    }
}