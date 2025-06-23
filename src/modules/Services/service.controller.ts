import { Controller, Get } from "@nestjs/common";
import { ServiceService } from "./service.service";



@Controller("auth")
export class ServiceController{
    constructor(private readonly serviceService: ServiceService){}

    @Get()
        getCart () {
            return this.serviceService.getService()
    }
}