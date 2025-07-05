import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UdpateUserDto } from "../../dtos/UdpateUserDto";
import * as bcrypt from 'bcrypt';

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

async updateUser(id: string, data: UdpateUserDto): Promise<User> {
  const user = await this.userRepository.findOneBy({ id: Number(id) });

  if (!user) {
    throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
  }

  if (data.email) {
    const normalizedEmail = data.email.trim().toLowerCase();

    const existingUser = await this.userRepository.findOneBy({ email: normalizedEmail });

    if (existingUser && existingUser.id !== Number(id)) {
      throw new BadRequestException('El correo ya está en uso por otro usuario');
    }

    user.email = normalizedEmail;
  }

  if (data.password_hash) {
    const hashedPassword = await bcrypt.hash(data.password_hash, 10);
    user.password_hash = hashedPassword;
  }

  if (data.name) user.name = data.name;
  if (data.telefono) user.telefono = data.telefono;
  if (typeof data.es_admin === 'boolean') user.es_admin = data.es_admin;

  return this.userRepository.save(user);
}


async deleteUser(id: string): Promise<{ message: string }> {
  await this.userRepository.delete(id);
  return { message: `Usuario con id ${id} eliminado` };
}

}