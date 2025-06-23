import { Controller, Get } from "@nestjs/common";
import { ReservationService } from "./reservation.service";



@Controller("auth")
export class ReservationController{
    constructor(private readonly reservationService: ReservationService){}

    @Get()
        getCart () {
            return this.reservationService.getReservation()
    }
}