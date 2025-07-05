import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { Service } from "./service.entity";
import { CreateServiceDto } from "../../dtos/CreateServiceDto";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "../Auth/role.enum";
import { AuthGuard } from "src/guards/authGuard";
import { RoleGuard } from "src/guards/roleGuard";



@Controller("service")
export class ServiceController{
    constructor(private readonly serviceService: ServiceService){}
    
    @Get()
        getService () {
            return this.serviceService.getService()
    }

    @Get(":id")
            getUserById (@Param('id') id: string) {
                return this.serviceService.getServiceById(id)
            }
            
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Post()
            createUser (@Body() service:CreateServiceDto) {
                return this.serviceService.saveService(service)
            }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Put(":id")
            updateUser(@Param('id') id: string, @Body() body: CreateServiceDto) {
            return this.serviceService.updateService(id, body);
            }
    
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete(":id")
            deleteUser (@Param('id') id: string) {
            return this.serviceService.deleteService(id)
            }
}