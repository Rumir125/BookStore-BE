import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookRequest } from 'src/interface/request/book-request';
import { BooksResponse } from 'src/interface/response/books-response';
import { Book } from './book.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  public constructor(private booksService: BooksService) {}

  @Get()
  public async getAllBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Post()
  public async createBook(
    @Body() bookRequest: BookRequest,
  ): Promise<BooksResponse> {
    return this.booksService.createBook(bookRequest);
  }
}
