import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  @Expose()
  title: string;

  @Column()
  @Expose()
  author: string;

  @Column()
  @Expose()
  year: number;

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}
