import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        UserService,
        { provide: 'BookRepository', useClass: Repository },
        { provide: 'UserRepository', useClass: Repository },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
