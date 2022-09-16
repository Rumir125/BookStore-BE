import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRequest } from 'src/interface/request/book-request';
import { User } from 'src/model/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @Inject(UserService)
    private userService: UserService,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['user'] });
  }

  async createBook(data: BookRequest, userId: number): Promise<Book> {
    const user = await this.userService.findOne(userId);
    return this.booksRepository.save({ ...data, user });
  }

  async deleteBook(id) {
    return this.booksRepository.delete(id);
  }
}
