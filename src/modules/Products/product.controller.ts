import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController{  
 constructor(private readonly productService: ProductService){}

    @Get()
        getProduct () {
            return this.productService.getProduct()
     }

    @Get(":id")
        getProductById (id: string) {
                 return this.productService.getProductById(id)
             }
     
         @Post()
             ProductUser () {
                 return this.productService.createProduct()
             }
         
         @Put(":id")
             udpateProduct (id : string) {
                 return this.productService.udpateProduct(id)
             }
     
         @Delete(":id")
             deleteProduct (id : string) {
                 return this.productService.deleteProduct(id)
             }
}