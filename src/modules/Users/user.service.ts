import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UdpateUserDto } from "../../dtos/UdpateUserDto";
import * as bcrypt from 'bcrypt';
import { UserSummaryDto } from "src/dtos/UserDto";

Injectable({})
export class UserService{
        constructor(
                @InjectRepository(User) private userRepository: Repository<User>,
            ){}
async getUser(): Promise<UserSummaryDto[]> {
  return this.userRepository.find({
    select: [
      'id',
      'name',
      'email',
      'telefono',
      'image',
      'es_admin',
      'status_activo',
    ],
  });
}

async getUserById(id: string): Promise<UserSummaryDto | null> {
  return await this.userRepository.findOne({
    where: { id: Number(id) },
    select: ['id', 'name', 'email', 'telefono', 'image', 'es_admin', 'status_activo'],
  });
}

async getUserReservations(id: number) {
  const user = await this.userRepository.findOne({
    where: { id },
    relations: [
      'reservations',
      'reservations.service',
    ],
  });

  if (!user) {
    throw new NotFoundException('Usuario no encontrado');
  }

  return user.reservations;
}


async updateUser(id: string, data: UdpateUserDto): Promise<Partial<User>> {
  const user = await this.userRepository.findOneBy({ id: Number(id) });

  if (!user) {
    throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
  }

  if (data.name && data.name.trim() !== '') {
  user.name = data.name.trim();
}

if (data.email && data.email.trim() !== '') {
  const normalizedEmail = data.email.trim().toLowerCase();
  // aquí valida si email existe ya como antes
  user.email = normalizedEmail;
}

if (data.password_hash && data.password_hash.trim() !== '') {
  const hashedPassword = await bcrypt.hash(data.password_hash, 10);
  user.password_hash = hashedPassword;
}

if (data.telefono && data.telefono.trim() !== '') {
  user.telefono = data.telefono.trim();
}

if (typeof data.es_admin === 'boolean') {
  user.es_admin = data.es_admin;
}


  const updatedUser = await this.userRepository.save(user);

  // Filtrar campos sensibles
  const {
    password_hash,
    google_id,
    createDate,
    status_activo,
    updatedAt,
    image,
    es_admin,
    ...safeUser
  } = updatedUser;

  return safeUser;
}


async deleteUser(id: string): Promise<{ message: string }> {
  const user = await this.userRepository.findOneBy({ id: Number(id) });

  if (!user) {
    throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
  }

  await this.userRepository.remove(user);

  return { message: `Usuario con ID ${id} eliminado correctamente` };
}

}