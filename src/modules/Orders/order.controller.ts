import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Order } from "./order.entity";
import { Roles } from "src/decorators/role.decorator";
import { AuthGuard } from "src/guards/authGuard";
import { RoleGuard } from "src/guards/roleGuard";
import { Role } from "../Auth/role.enum";
import { SimpleOrderDto } from "src/dtos/OrderDto";


@ApiTags('order')
@Controller("order")
export class OrderController{
    constructor(private readonly orderService: OrderService){}
    
@Get()
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@ApiOkResponse({ description: 'Lista de todos las ordenes', type: [SimpleOrderDto] })
getAllOrders() : Promise<SimpleOrderDto[]>  {
  return this.orderService.getAllOrders();
}

@Get(':userId')
@UseGuards(AuthGuard, RoleGuard)
@ApiOkResponse({ description: 'Lista de todas las ordenes por Usuario ', type: [SimpleOrderDto] })
getOrders(@Param('userId', ParseIntPipe) userId: number) {
  return this.orderService.getOrdersByUser(userId);
}
}