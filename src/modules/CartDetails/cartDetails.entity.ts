import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cart } from "../Cart/cart.entity";
import { Product } from "../Products/product.entity";

@Entity({ name: "cart-details" })
export class CartDetails {
  @PrimaryGeneratedColumn()
  id_item: number;

  @ManyToOne(() => Cart, cart => cart.details)
  @JoinColumn({ name: "id_cart" })
  cart: Cart;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "id_product" })
  product: Product;

  @Column({ type: "int", default: 1 })
  cantidad: number;

  @Column("decimal", { precision: 10, scale: 2 })
  precio_unitario: number;
}
