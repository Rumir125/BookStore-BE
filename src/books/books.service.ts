import {
  BadRequestException,
  Inject,
  Injectable,
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

  async findAll(itemsPerPage: number, page: string): Promise<Book[]> {
    const skip = Number(page);
    const take = Number(itemsPerPage);
    return this.booksRepository.find({ take: take, skip: skip });
  }

  async createBook(data: BookRequest, userId: number): Promise<Book> {
    const user = await this.userService.findOne(userId);
    const numOfBooks = await this.booksRepository.count();
    if (numOfBooks > 20) {
      throw new BadRequestException('Books limit reached!');
    }
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
    return this.booksRepository
      .createQueryBuilder('book')
      .where('book.id = :bookId')
      .setParameter('bookId', bookId)
      .leftJoinAndSelect('book.user', 'user')
      .getOne();
  }

  async getUserBooks(userId: number, itemsPerPage?: number, page?: number) {
    const skip = Number(page);
    const take = Number(itemsPerPage);
    return (
      this.booksRepository
        .createQueryBuilder('book')
        .take(take)
        .skip(skip)
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
