import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("films")
export class Film extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column()
  release_year: Date;
}
