import { Injectable } from "@nestjs/common";

Injectable({})
export class UserService{
getUser () {
        return "getUser"
}

getUserById (id : string) {
        return "getUserId"
}

createUser () {
        return "usuario creado"
}

udpateUser (id : string) {
        return "usuario  modificado"
}

deleteUser (id : string) {
        return "usuario  eliminado"
}

}