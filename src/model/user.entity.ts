import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Book } from 'src/books/book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ nullable: true })
  @Expose()
  username: string;

  @Column()
  @Expose()
  firstName: string;

  @Column()
  @Expose()
  lastName: string;

  @Column({ default: true })
  @Exclude()
  isActive: boolean;

  @Column({ default: 'test' })
  @Exclude()
  password: string;

  @OneToMany(() => Book, (book) => book.user)
  @Expose()
  books: Book[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
