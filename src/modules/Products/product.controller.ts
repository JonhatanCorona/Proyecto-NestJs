import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "../../dtos/ProductDto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "./product.entity";
import { AuthGuard } from "src/guards/authGuard";
import { RoleGuard } from "src/guards/roleGuard";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "../Auth/role.enum";


@ApiTags('products')
@Controller("product")
export class ProductController{  
 constructor(private readonly productService: ProductService){}

@Get()
  @ApiOkResponse({ description: 'Lista de todos los productos', type: [Product] })
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

   
  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
  @ApiOkResponse({ description: 'Producto encontrado', type: Product })
  @ApiNotFoundResponse({ description: 'Producto no encontrado' })
  async getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }
  
  //@Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  @ApiCreatedResponse({ description: 'Producto creado exitosamente', type: Product })
  @ApiBadRequestResponse({ description: 'Datos Inválidos' })
  async createProduct(@Body() productDto: CreateProductDto): Promise<Product> {
    return this.productService.saveProduct(productDto);
}

//@Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)         
  @Put(':id')
  @ApiResponse({ status: 200, type: UpdateProductDto })
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productService.updateProduct(id, body);
}
  
//@Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente' })
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
}
}