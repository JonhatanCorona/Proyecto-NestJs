import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { AuthService } from "../Auth/auth.service";
import { AuthGuard } from "src/guards/authGuard";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "../Auth/role.enum";
import { RoleGuard } from "src/guards/roleGuard";
import { UdpateUserDto } from "../../dtos/UdpateUserDto";

@Controller("user")
export class UserController{

   constructor(private readonly userService: UserService,
    private readonly authService: AuthService
   ) {}
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
        async getUsers(): Promise<User[]> {
            return this.userService.getUser();
  }

    @Get(":id")
        getUserById (@Param('id') id: string) {
            return this.userService.getUserById(id)
        }

    @Get(':id/reservations')
        getUserReservations(@Param('id') id: number) {
            return this.userService.getUserReservations(id);
  }
    
    @Put(":id")
        updateUser(@Param('id') id: string, @Body() body: UdpateUserDto) {
        return this.userService.updateUser(id, body);
        }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete(":id")
        deleteUser (@Param('id') id: string) {
            return this.userService.deleteUser(id)
        }

}