import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../model/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
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

  @Column({ array: true, default: [] })
  @Expose()
  genres: string;

  @Column({ default: '' })
  @Expose()
  description: string;

  @Column({ default: '' })
  @Expose()
  photoUrl: string;

  @Expose()
  @ManyToOne(() => User, (user) => user.books, { onDelete: 'CASCADE' })
  user: User;

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}
