import { Injectable, NotFoundException } from "@nestjs/common";
import { Reservation } from "./reservation.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateReservationDto } from "./CreateReservationDto";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
  ) {}

async getReservation(): Promise<Reservation[]> {
  return await this.reservationRepository
    .createQueryBuilder('reservation')
    .leftJoinAndSelect('reservation.user', 'user')
    .leftJoinAndSelect('reservation.service', 'service')
    .select([
      'reservation.id',
      'reservation.date',
      'reservation.status',
      'reservation.notas',
      'user.name',
      'service.name',
    ])
    .getMany();
}

  async getReservationById(id: string): Promise<Reservation | null> {
    return await this.reservationRepository.findOneBy({ id: Number(id) });
  }

async saveReservation(reservationDto: CreateReservationDto): Promise<Reservation> {
  if (!reservationDto.userId) {
    throw new Error("El usuario es obligatorio");
  }
  if (!reservationDto.serviceId) {
    throw new Error("El servicio es obligatorio");
  }

  const reservation = this.reservationRepository.create({
  userId: reservationDto.userId,     // asigna solo el número
  serviceId: reservationDto.serviceId,
  date: reservationDto.date,
  status: 'pendiente',
  notas: reservationDto.notas,
});

  return await this.reservationRepository.save(reservation);
}

async updateReservation(id: string, reservation: CreateReservationDto): Promise<Reservation> {
  const user = await this.reservationRepository.findOneBy({ id: Number(id) });

  if (!user) {
    throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
  }

  Object.assign(user, reservation); // Sobrescribe solo los campos presentes
  return this.reservationRepository.save(user); // <- Aquí está la corrección
}

 async deleteReservation(id: string): Promise<{ message: string }> {
  await this.reservationRepository.delete(id);
  return { message: `Reservacion con numero ${id} eliminada` };
}
}
