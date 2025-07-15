import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "../Auth/role.enum";
import { AuthGuard } from "src/guards/authGuard";
import { RoleGuard } from "src/guards/roleGuard";
import { CreateReservationDto, SimpleReservationDto } from "src/dtos/ReservationDto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Reservation } from "./reservation.entity";

export interface UpdateReservationDto {
id: string,
service: string,
date: string,
status: string,
}
@Controller("reservation")
export class ReservationController{
    constructor(private readonly reservationService: ReservationService){}

    //@Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
    @ApiOkResponse({ description: 'Lista de todos los productos', type: [Reservation] })
      getReservation(): Promise<SimpleReservationDto[]> {
      return this.reservationService.getReservation();
}
    
    //@Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Get(':id')
    @ApiParam({ name: 'id', type: 'string', description: 'ID de la reserva' })
    @ApiOkResponse({description: 'Reserva encontrada por ID', type: SimpleReservationDto,})
    @ApiNotFoundResponse({description: 'Reserva no encontrada',})
      async getReservationById(@Param('id') id: string): Promise<SimpleReservationDto | null> {
      return this.reservationService.getReservationById(id);
}

    //@Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Post()
    @ApiCreatedResponse({ description: 'Reservacion creada exitosamente' })
    @ApiBadRequestResponse({ description: 'Datos Inválidos' })
        saveReservation (@Body() reservation:CreateReservationDto) {
        return this.reservationService.saveReservation(reservation)
}

    //@Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Put(':id')
    @ApiResponse({status: 200, description: 'Reservación actualizada con éxito',})
    @ApiBadRequestResponse({ description: 'Datos inválidos' })
    @ApiNotFoundResponse({ description: 'Reservación no encontrada' })
       updateReservation(@Param('id') id: string, @Body() body: UpdateReservationDto) {
       return this.reservationService.updateReservation(id, body);
}

    //@Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Reservacion eliminada correctamente' })
    deleteProduct(@Param('id') id: string) {
    return this.reservationService.deleteReservation(id);
}
}