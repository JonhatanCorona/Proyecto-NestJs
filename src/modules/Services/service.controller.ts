import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "../Auth/role.enum";
import { AuthGuard } from "src/guards/authGuard";
import { RoleGuard } from "src/guards/roleGuard";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { CreateServiceDto, UpdateServiceDto } from "src/dtos/ServiceDto";
import { Service } from "./service.entity";



@Controller("service")
export class ServiceController{
    constructor(private readonly serviceService: ServiceService){}
    
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiResponse({ status: 200, type: [Service]})
    @Get()
        getService () {
            return this.serviceService.getService()
       }
    
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiResponse({ status: 200, type: Service })
    @Get(":id")
            getUserById (@Param('id') id: string) {
                return this.serviceService.getServiceById(id)
        }
    
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiResponse({ status: 201, description: 'Servicio creado correctamente' })
    @Post()
            createUser (@Body() service:CreateServiceDto) {
                return this.serviceService.saveService(service)
            }

    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiResponse({ status: 200, description: 'Servicio Actualizado correctamente' })
    @Put(":id")
            updateUser(@Param('id') id: string, @Body() body: UpdateServiceDto) {
            return this.serviceService.updateService(id, { ...body });
            }
    
    @ApiBearerAuth()      
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiResponse({ status: 200, description: 'Servicio Eliminado correctamente' })
    @Delete(":id")
            deleteUser (@Param('id') id: string) {
            return this.serviceService.deleteService(id)
            }
}