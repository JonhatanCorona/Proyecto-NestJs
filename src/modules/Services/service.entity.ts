import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "service" })
export class Service {
  @PrimaryGeneratedColumn()
  id_service: number;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column("decimal", { precision: 10, scale: 2 })
  precio: number;

  @Column("int")
  duracion_min: number;
}
