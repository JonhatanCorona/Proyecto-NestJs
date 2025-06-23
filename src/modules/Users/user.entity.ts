import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Cart } from "../Cart/cart.entity";
import { Order } from "../Orders/order.entity";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

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

  @CreateDateColumn({ name: "date" })
  date: Date;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
