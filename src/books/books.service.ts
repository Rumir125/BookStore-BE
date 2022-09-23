import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRequest } from '../interface/request/book-request';
import { UserService } from '../user/user.service';
import { Repository, UpdateResult } from 'typeorm';
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

  async deleteBook(id, userId) {
    const user = await this.userService.findOne(userId);
    const book = await this.booksRepository.findOneBy({ id, user });
    if (!book) {
      throw new UnauthorizedException();
    }

    return this.booksRepository.delete(id);
  }

  getBook(bookId: number): Promise<Book> {
    return this.booksRepository.findOneBy({ id: bookId });
  }

  async getUserBooks(userId: number) {
    return (
      this.booksRepository
        .createQueryBuilder('book')
        .where('book.user = :user')
        .setParameter('user', userId)
        .leftJoinAndSelect('book.user', 'user')
        // .select('user.id')
        .getMany()
    );
  }

  async updateBook(
    bookId: number,
    bookRequest: BookRequest,
    userId,
  ): Promise<UpdateResult> {
    const user = await this.userService.findOne(userId);
    const book = await this.booksRepository.findOneBy({ id: bookId, user });
    if (!book) {
      throw new UnauthorizedException();
    }
    return this.booksRepository.update(book, bookRequest);
  }
}
