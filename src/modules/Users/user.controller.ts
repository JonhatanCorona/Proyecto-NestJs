import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController{

   constructor(private readonly userService: UserService) {}

   @Get()
         getUser () {
             return this.userService.getUser()
     }

    @Get(":id")
        getUserById (id: string) {
            return this.userService.getUserById(id)
        }

    @Post()
        createUser () {
            return this.userService.createUser()
        }
    
    @Put(":id")
        udpateUser (id : string) {
            return this.userService.udpateUser(id)
        }

    @Delete(":id")
        deleteUser (id : string) {
            return this.userService.deleteUser(id)
        }


}