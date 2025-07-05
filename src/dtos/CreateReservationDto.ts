import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  serviceId: number;

  @IsNotEmpty()
  @IsDateString({}, { message: 'La fecha debe tener formato válido' })
  date: string; 

  @IsOptional()
  @IsString()
  notas?: string;
}
