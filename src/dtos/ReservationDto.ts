import { ApiProperty, PartialType } from "@nestjs/swagger";
import { UserSummaryDto } from "./UserDto";
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ServiceDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  duracion_min: number;
}



export class ReservationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  serviceId: number;

  @ApiProperty({ type: ServiceDto })
  service: ServiceDto;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  notas: string;
}


export class SimpleReservationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  serviceName: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  notas?: string | null;
}

export class CreateReservationDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @ApiProperty()
  serviceId: number;

  @IsNotEmpty()
  @IsDateString({}, { message: 'La fecha debe tener formato válido' })
  @ApiProperty()
  date: string; 

  @IsOptional()
  @IsString()
  @ApiProperty()
  notas?: string;
}

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}