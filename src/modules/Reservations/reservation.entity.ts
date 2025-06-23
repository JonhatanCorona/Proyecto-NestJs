import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../Users/user.entity";
import { Service } from "../Services/service.entity";


@Entity({ name: "reservation" })
export class Reservation {
  @PrimaryGeneratedColumn()
  id_reservation: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Service)
  @JoinColumn({ name: "id_service" })
  service: Service;

  @Column("timestamp")
  date: Date;

  @Column({ length: 20 })
  status: string; // pendiente, confirmada, cancelada, completada

  @Column({ type: "text", nullable: true })
  notas: string | null;
}
