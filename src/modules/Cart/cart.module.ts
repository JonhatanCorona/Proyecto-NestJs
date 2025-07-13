import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { Cart } from "./cart.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartDetails } from "../CartDetails/cartDetails.entity";
import { Product } from "../Products/product.entity";
import { Order } from "../Orders/order.entity";
import { OrderDetails } from "../OrderDetails/orderDetails.entity";
import { User } from "../Users/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Cart, CartDetails, Product, Order, OrderDetails, User])
            ],
    providers: [CartService],
    controllers: [CartController]
})
export class CartModule{}