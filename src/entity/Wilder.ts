import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Skill } from "./Skill";
@Entity()
export class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @ManyToMany((type) => Skill, { eager: true })
  @JoinTable()
  skills: Skill[];
}
