import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./CreateUserDto";

Injectable({})
export class UserService{
        constructor(
                @InjectRepository(User) private userRepository: Repository<User>,
            ){}
async getUser(): Promise<User[]> {
    return await this.userRepository.find();
}

async getUserById(id: string): Promise<User | null> {
  return await this.userRepository.findOneBy({ id: Number(id) });
}

async getUserReservations(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['reservations'], 
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user.reservations;
  }

async createUser(user: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ email: user.email });
  if (existingUser) {
    throw new ConflictException('El correo ya existe');
  }
  return await this.userRepository.save(user);
}

async updateUser(id: string, data: CreateUserDto): Promise<User> {
  const user = await this.userRepository.findOneBy({ id: Number(id) });

  if (!user) {
    throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
  }

  Object.assign(user, data); // Solo sobreescribe los campos presentes
  return this.userRepository.save(user);
}

async deleteUser(id: string): Promise<{ message: string }> {
  await this.userRepository.delete(id);
  return { message: `Usuario con id ${id} eliminado` };
}

}