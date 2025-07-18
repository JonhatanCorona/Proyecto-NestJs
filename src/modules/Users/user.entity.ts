import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn
} from "typeorm";
import { Order } from "../Orders/order.entity";
import { Reservation } from "../Reservations/reservation.entity";
import { Cart } from "../Cart/cart.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password_hash: string;

  @Column({ nullable: true })
  google_id: string;

  @Column({ default: false })
  es_admin: boolean;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  status_activo: boolean;  

  @CreateDateColumn({ name: "date" })
  createDate: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Cart, cart => cart.user)
  cart: Cart[];
}
