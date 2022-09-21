import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  @Expose()
  tag_id: number;

  @Expose()
  @Column()
  name: string;

  constructor(partial: Partial<Genre>) {
    Object.assign(this, partial);
  }
}
