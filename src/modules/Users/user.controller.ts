import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { AuthService } from "../Auth/auth.service";
import { AuthGuard } from "src/guards/authGuard";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "../Auth/role.enum";
import { RoleGuard } from "src/guards/roleGuard";
import { UdpateUserDto, UdpateUserResponseDto } from "../../dtos/UdpateUserDto";
import { ApiResponse } from "@nestjs/swagger";
import { UserSummaryDto } from "src/dtos/UserDto";
import { ReservationDto } from "src/dtos/ReservationDto";

@Controller("user")
export class UserController{

   constructor(private readonly userService: UserService,
    private readonly authService: AuthService
   ) {}
    //@Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
    @ApiResponse({ status: 200, type: [UserSummaryDto] })
        async getUsers(): Promise<UserSummaryDto[]> {
        return this.userService.getUser();
}

    //@Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Get(":id")
    @ApiResponse({ status: 200, type: UserSummaryDto })
        getUserById(@Param('id') id: string): Promise<UserSummaryDto | null> {
        return this.userService.getUserById(id);
}
    @UseGuards(AuthGuard)
    @Get(':id/reservations')
    @ApiResponse({ status: 200, description: 'Reservas del usuario', type: [ReservationDto] })
        getUserReservations(@Param('id') id: number) {
        return this.userService.getUserReservations(id);
}

    @UseGuards(AuthGuard)
    @Put(":id")
    @ApiResponse({ status: 200, type: UdpateUserResponseDto })
        updateUser(@Param('id') id: string, @Body() body: UdpateUserDto) {
        return this.userService.updateUser(id, body);
        }

    //@Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete(":id")
    @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
        deleteUser(@Param('id') id: string): Promise<{ message: string }> {
        return this.userService.deleteUser(id);
}

}