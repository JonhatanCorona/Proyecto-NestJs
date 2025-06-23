import { Order } from "src/modules/Orders/order.entity";
import { Product } from "src/modules/Products/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";


@Entity({ name: "order-details" })
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id_order: number;

  @ManyToOne(() => Order, order => order.details)
  @JoinColumn({ name: "id_order" })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "id_product" })
  product: Product;

  @Column("decimal", { precision: 10, scale: 2 })
  precio_unitario: number;

  @Column("int")
  cantidad: number;
}
