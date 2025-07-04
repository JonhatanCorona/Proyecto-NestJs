import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "./cart.entity";
import { Repository } from "typeorm";

Injectable({})
export class CartService{

    constructor(
                    @InjectRepository(Cart) private userRepository: Repository<Cart>,
                ){}

async getCart(): Promise<Cart[]> {
    return await this.userRepository.find();
}
}