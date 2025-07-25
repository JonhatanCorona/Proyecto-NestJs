import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "../Users/user.entity";
import { CartDetails } from "../CartDetails/cartDetails.entity";

@Entity({ name: "cart" })
export class Cart {
  @PrimaryGeneratedColumn()
  id_cart: number;
  

  @CreateDateColumn({ name: "fecha_creacion" })
  fecha_creacion: Date;

  @ManyToOne(() => User, user => user.cart)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => CartDetails, details => details.cart)
  details: CartDetails[];   
}
