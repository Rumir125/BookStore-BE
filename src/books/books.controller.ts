import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user.decorator';
import { BookRequest } from '../interface/request/book-request';
import { BooksResponse } from '../interface/response/books-response';
import { Book } from './book.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  public constructor(private booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAllBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  public async getUserBooks(@Param('id') userId: any): Promise<Book[]> {
    return this.booksService.getUserBooks(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createBook(
    @Body() bookRequest: BookRequest,
    @User() user,
  ): Promise<BooksResponse> {
    return this.booksService.createBook(bookRequest, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async getBook(@Param('id') bookId: number): Promise<Book> {
    return this.booksService.getBook(bookId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:bookId')
  public async deleteBook(@Param('bookId') bookId: number, @User() user) {
    await this.booksService.deleteBook(bookId, user.id);
    return 'Book successfully deleted';
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  public async updateBook(
    @Param('id') bookId: number,
    @Body() bookRequest: BookRequest,
    @User() user,
  ) {
    return this.booksService.updateBook(bookId, bookRequest, user.id);
  }
}
