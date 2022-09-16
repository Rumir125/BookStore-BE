import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/model/user.entity';

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

  @Expose()
  @ManyToOne(() => User, (user) => user.books)
  user: User;

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}
