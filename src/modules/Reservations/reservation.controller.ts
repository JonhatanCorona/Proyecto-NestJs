import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { CreateReservationDto } from "./CreateReservationDto";

export interface UpdateReservationDto {
id: string,
service: string,
date: string,
status: string,
}
@Controller("reservation")
export class ReservationController{
    constructor(private readonly reservationService: ReservationService){}

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