import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { CreateReservationDto } from "../../dtos/CreateReservationDto";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "../Auth/role.enum";
import { AuthGuard } from "src/guards/authGuard";
import { RoleGuard } from "src/guards/roleGuard";

export interface UpdateReservationDto {
id: string,
service: string,
date: string,
status: string,
}
@Controller("reservation")
export class ReservationController{
    constructor(private readonly reservationService: ReservationService){}

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
        getReservation () {
            return this.reservationService.getReservation()
    }

    @Get(":id")
        getReservationById (@Param('id') id: string) {
            return this.reservationService.getReservationById(id)
    }

    @Post()
        saveReservation (@Body() reservation:CreateReservationDto) {
            return this.reservationService.saveReservation(reservation)
    }

    @Put(":id")
        updateUser(@Param('id') id: string, @Body() body: CreateReservationDto) {
            return this.reservationService.updateReservation(id, body);
    }

    @Delete(":id")
            deleteUser (@Param('id') id: string) {
                return this.reservationService.deleteReservation(id)
            }
}