import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "service" })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column("int")
  duracion_min: number;
}
