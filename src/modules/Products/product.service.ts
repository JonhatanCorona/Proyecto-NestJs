import { Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "../../dtos/CreateProductDto";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "../Auth/role.enum";
import { AuthGuard } from "src/guards/authGuard";
import { RoleGuard } from "src/guards/roleGuard";

Injectable({})
export class ProductService{
constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

async getProduct(): Promise<Product[]> {
    return await this.productRepository.find();
  }

async getProductById(id: string): Promise<Product | null> {
    return await this.productRepository.findOneBy({ id: Number(id) });
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
async saveProduct(product: CreateProductDto): Promise<Product> {
  return await this.productRepository.save(product);
}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
async updateProduct(id: string, data: CreateProductDto): Promise<Product> {
  const product = await this.productRepository.findOneBy({ id: Number(id) });

  if (!product) {
    throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
  }

  Object.assign(product, data); // Solo sobreescribe los campos presentes
  return this.productRepository.save(product);
}


  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
async deleteProduct(id: string): Promise<{ message: string }> {
  await this.productRepository.delete(id);
  return { message: `Usuario con id ${id} eliminado` };
}


}