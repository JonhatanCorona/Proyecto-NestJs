import { Injectable, SetMetadata } from "@nestjs/common";
import { Role } from "src/modules/Auth/role.enum";

export const Roles = (... roles: Role[]) => SetMetadata("roles", roles);