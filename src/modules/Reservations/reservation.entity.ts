import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../Users/user.entity";
import { Service } from "../Services/service.entity";


@Entity({ name: "reservation" })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;  // <--- aquí

  @ManyToOne(() => Service)
  @JoinColumn({ name: "serviceId" })
  service: Service;

  @Column()
  serviceId: number;  // <--- aquí

  @Column("timestamp")
  date: Date;

  @Column({ length: 20, default: 'pendiente' })
  status: string; 
  
  @Column({ type: "text", nullable: true })
  notas: string | null;
}
