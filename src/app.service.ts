import { Injectable } from '@nestjs/common';
import { BooksResponse } from './interface/response/books-response';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getBooks(): BooksResponse[] {
    return [
      {
        title: '1984',
        author: 'George Orwell',
        year: 1949,
      },
    ];
  }
}
