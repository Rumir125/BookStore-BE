import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user.decorator';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { BookResponseDto } from '../dtos/book-response.dto';
import { BookRequest } from '../dtos/book-request.dto';

@Controller('books')
@UseInterceptors(new SerializeInterceptor(BookResponseDto))
export class BooksController {
  public constructor(private booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAllBooks(
    @Query('itemsPerPage') itemsPerPage,
    @Query('page') page,
  ): Promise<Book[]> {
    return this.booksService.findAll(itemsPerPage, page);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  public async getUserBooks(
    @Param('id') userId: any,
    @Query('itemsPerPage') itemsPerPage,
    @Query('page') page,
  ): Promise<Book[]> {
    return this.booksService.getUserBooks(userId, itemsPerPage, page);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createBook(
    @Body() bookRequest: BookRequest,
    @User() user,
  ): Promise<Book> {
    return this.booksService.createBook(bookRequest, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async getBook(@Param('id') bookId: number): Promise<BookResponseDto> {
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
