import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { User } from "../Users/user.entity";
import { OrderDetails } from "src/modules/OrderDetails/orderDetails.entity";

@Entity({ name: "order" })
export class Order {
  @PrimaryGeneratedColumn()
  id_orden: number;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: "userId" })
  user: User;

  @CreateDateColumn()
  date: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  total: number;

  @Column({ type: "varchar", length: 20 })
  estado: string; // pendiente, pagado, enviado, cancelado

  @OneToMany(() => OrderDetails, details => details.order)
  details: OrderDetails[];
}
