import { Controller, Get } from "@nestjs/common";
import { CartService } from "./cart.service";


@Controller("auth")
export class CartController{
    constructor(private readonly authService: CartService){}

    @Get()
        getCart () {
            return this.authService.getCart()
    }
}