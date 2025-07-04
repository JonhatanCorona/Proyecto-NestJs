import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./CreateProductDto";

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

async saveProduct(product: CreateProductDto): Promise<Product> {
  return await this.productRepository.save(product);
}

async updateProduct(id: string, data: CreateProductDto): Promise<Product> {
  const product = await this.productRepository.findOneBy({ id: Number(id) });

  if (!product) {
    throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
  }

  Object.assign(product, data); // Solo sobreescribe los campos presentes
  return this.productRepository.save(product);
}

async deleteProduct(id: string): Promise<{ message: string }> {
  await this.productRepository.delete(id);
  return { message: `Usuario con id ${id} eliminado` };
}


}