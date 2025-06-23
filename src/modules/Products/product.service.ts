import { Injectable } from "@nestjs/common";

Injectable({})
export class ProductService{
getProduct () {
        return "getProduct"
}



getProductById (id : string) {
        return "getProductId"
}

createProduct () {
        return "Producto creado"
}

udpateProduct (id : string) {
        return "Producto  modificado"
}

deleteProduct (id : string) {
        return "Producto  eliminado"
}

}