import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("genres")
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  is_active: boolean;
}
