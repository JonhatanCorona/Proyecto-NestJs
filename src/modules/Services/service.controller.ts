import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { Service } from "./service.entity";
import { CreateServiceDto } from "./CreateServiceDto";



@Controller("service")
export class ServiceController{
    constructor(private readonly serviceService: ServiceService){}

    @Get()
        getCart () {
            return this.serviceService.getService()
    }

    @Get(":id")
            getUserById (@Param('id') id: string) {
                return this.serviceService.getServiceById(id)
            }

    @Post()
            createUser (@Body() service:CreateServiceDto) {
                return this.serviceService.saveService(service)
            }
    
    @Put(":id")
            updateUser(@Param('id') id: string, @Body() body: CreateServiceDto) {
            return this.serviceService.updateService(id, body);
            }
    
    
    @Delete(":id")
            deleteUser (@Param('id') id: string) {
            return this.serviceService.deleteService(id)
            }
}