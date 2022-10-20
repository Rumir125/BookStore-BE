import { Expose } from 'class-transformer';
import { UserDto } from './user.dto';

export class BookResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  year: number;

  @Expose()
  genres: string;

  @Expose()
  description: string;

  @Expose()
  photoUrl: string;

  @Expose()
  user: UserDto;
}
