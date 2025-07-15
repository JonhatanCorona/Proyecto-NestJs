import { BadRequestException, Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto, UpdateProductDto } from "../../dtos/ProductDto";

Injectable({})
export class ProductService{
constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

 async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

async getProductById(id: number): Promise<Product | null> {
  return await this.productRepository.findOneBy({ id });
}

async saveProduct(productDto: CreateProductDto): Promise<Product> {
  return await this.productRepository.save(productDto);
}

async updateProduct(id: string, data: UpdateProductDto): Promise<Product> {
  const productId = Number(id);

  if (isNaN(productId)) {
    throw new BadRequestException('El ID debe ser un número válido');
  }

  const product = await this.productRepository.findOneBy({ id: productId });

  if (!product) {
    throw new NotFoundException(`Producto con ID ${id} no encontrado`);
  }

  Object.assign(product, data);
  return await this.productRepository.save(product);
}

async deleteProduct(id: string): Promise<{ message: string }> {
  const productId = Number(id);

  if (isNaN(productId)) {
    throw new BadRequestException('El ID debe ser un número válido');
  }

  const result = await this.productRepository.delete(productId);

  if (result.affected === 0) {
    throw new NotFoundException(`Producto con ID ${id} no encontrado`);
  }

  return { message: `Producto con ID ${id} eliminado correctamente` };
}



}