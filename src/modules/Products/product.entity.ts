import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "product" })
export class Product {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column()
  nombre: string;

  @Column("text")
  descripcion: string;

  @Column("decimal", { precision: 10, scale: 2 })
  precio: number;

  @Column("int")
  stock: number;

  @Column()
  url_imagen: string;
}
