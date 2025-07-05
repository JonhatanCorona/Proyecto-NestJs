import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "../../dtos/CreateProductDto";

@Controller("product")
export class ProductController{  
 constructor(private readonly productService: ProductService){}

   @Get()
            getProduct () {
               return this.productService.getProduct()
       }
   
    @Get(":id")
            getProductById (@Param('id') id: string) {
               return this.productService.getProductById(id)
       }
     
    @Post()
            ProductUser (@Body() product:CreateProductDto) {
                return this.productService.saveProduct(product)
        }
         
    @Put(":id")
            updateUser(@Param('id') id: string, @Body() body: CreateProductDto) {
                return this.productService.updateProduct(id, body);
        }
     
    @Delete(":id")
             deleteProduct (@Param('id') id : string) {
                 return this.productService.deleteProduct(id)
        }
}