import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { BooksController } from './books.controller';
import { BooksModule } from './books.module';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let userService: UserService;
  let bookService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        UserService,
        {
          provide: 'BookRepository',
          useClass: Repository,
        },
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    userService = module.get<UserService>(UserService);
    bookService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
