import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDto } from "./CreateUserDto";
import { AuthService } from "../Auth/auth.service";
import { AuthGuard } from "src/guards/authGuard";


@Controller("user")
export class UserController{

   constructor(private readonly userService: UserService,
    private readonly authService: AuthService
   ) {}
    @UseGuards(AuthGuard)
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
        updateUser(@Param('id') id: string, @Body() body: CreateUserDto) {
        return this.userService.updateUser(id, body);
        }


    @Delete(":id")
        deleteUser (@Param('id') id: string) {
            return this.userService.deleteUser(id)
        }


}