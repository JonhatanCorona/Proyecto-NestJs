import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Reservation } from "./reservation.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateReservationDto, SimpleReservationDto, UpdateReservationDto } from "src/dtos/ReservationDto";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
  ) {}

async getReservation(): Promise<SimpleReservationDto[]> {
  const reservations = await this.reservationRepository
    .createQueryBuilder('reservation')
    .leftJoinAndSelect('reservation.user', 'user')
    .leftJoinAndSelect('reservation.service', 'service')
    .getMany();

  return reservations.map(r => ({
  id: r.id,
  userName: r.user.name,
  serviceName: r.service.name,
  date: r.date,
  status: r.status,
  notas: r.notas ?? undefined,
}));
}

async getReservationById(id: string): Promise<SimpleReservationDto | null> {
  const reservation = await this.reservationRepository
    .createQueryBuilder('reservation')
    .leftJoinAndSelect('reservation.user', 'user')
    .leftJoinAndSelect('reservation.service', 'service')
    .where('reservation.id = :id', { id: Number(id) })
    .select([
      'reservation.id',
      'reservation.date',
      'reservation.status',
      'reservation.notas',
      'user.name',
      'service.name',
    ])
    .getOne();

  if (!reservation) return null;

  return {
    id: reservation.id,
    userName: reservation.user.name,
    serviceName: reservation.service.name,
    date: reservation.date,
    status: reservation.status,
    notas: reservation.notas ?? undefined,
  };
}


async saveReservation(reservationDto: CreateReservationDto): Promise<{ message: string }> {
  if (!reservationDto.userId) {
    new BadRequestException("El usuario es obligatorio");
  }

  if (!reservationDto.serviceId) {
    new BadRequestException("El servicio es obligatorio");
  }

  const reservation = this.reservationRepository.create({
    userId: reservationDto.userId,
    serviceId: reservationDto.serviceId,
    date: reservationDto.date,
    status: 'pendiente',
    notas: reservationDto.notas,
  });

  await this.reservationRepository.save(reservation);

  return { message: 'Reservación registrada con éxito' };
}


async updateReservation(id: string, data: UpdateReservationDto): Promise<{ message: string }> {
  const reservation = await this.reservationRepository.findOneBy({ id: Number(id) });

  if (!reservation) {
    throw new NotFoundException(`Reservación con ID ${id} no encontrada`);
  }

  Object.assign(reservation, data);
  await this.reservationRepository.save(reservation);

  return { message: `Reservación con ID ${id} actualizada con éxito` };
}


async deleteReservation(id: string): Promise<{ message: string }> {
  const result = await this.reservationRepository.delete(id);

  if (result.affected === 0) {
    throw new NotFoundException(`Reservación con número ${id} no encontrada`);
  }

  return { message: `Reservación con número ${id} eliminada exitosamente` };
}

}
